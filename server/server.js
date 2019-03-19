const express = require('express');
const bodyParser = require('body-parser');
// const morgan = require('morgan');

const app = express();
app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(morgan('combined'));

const Person = require("./models/persons");
// DB Setup
const DATABASE_URL = process.env.DATABASE_URL || 'localhost';
const DATABASE = process.env.DATABASE || 'persons';
const MONGO_CONFIG = {
  useCreateIndex: true,
  useNewUrlParser: true
}

const mongoose = require('mongoose');
mongoose.connect(`mongodb://${DATABASE_URL}/${DATABASE}`, MONGO_CONFIG );

const db = mongoose.connection;

db.on('error', (error) => {
  // Waiting for the server first connect
  if (error.message && error.message.match(/failed to connect to server .* on first connect/)) {
    setTimeout(() => {
      mongoose.connect(`mongodb://${DATABASE_URL}/${DATABASE}`, MONGO_CONFIG).catch(() => {
        // empty catch avoids unhandled rejections
      });
    }, 20 * 1000);
  } else {
    // Output other errors once occurred
    console.error(new Date(), String(error));
  }
});

db.once("open", (callback) => {
  console.log("MongoDB connection established");
  // seeding DB if it's empty, if you won't clean collection - it happen once otherwise call "/clean" route and then restart the server
  Person.countDocuments({}, (err, cnt) => {
    if (cnt === 0) {
      require('./seeding')
    } else {
      console.log('Collection already seeded with ' + cnt + ' objects');
    }
  });
});

// SERVER Setup
app.get('/', (req, res) => res.status(200).send('API is running'));   // just indicates that API server is up and running
app.post('/', (req, res) => {   // return all persons if request body is empty or direct filter result with combination of fields that have values to compare
  let query = req.body ? req.body : {}
  Person.find( query ).sort({ display_name: 1 }).exec((error, list) => {
    if (error) res.status(400).json(error)
    res.status(200).json(list)
  });
});
app.post('/clear', (req, res) => { // service route cleaning the collection
  Person.deleteMany({}).exec((error, ret) => {
    if (error) res.status(400).json(error)
    res.status(200).json(ret)
  });
});
app.post('/filter', (req, res) => { // actual filter route
  const LIMITS = {
    AGE: { MIN: 17, MAX: 96 },
    HEIGHT: { MIN: 134, MAX: 211 },
    SCORE: { MIN: 0, MAX: 1 },
    RANGE: { MIN: 30000, MAX: 300000 }
  }

  let query = {} // compiling query

  // checking for boolean filter options
  if (req.body.hasphoto)  query.main_photo = { $exists : true };   // to be absolutely graceful we should check if http request of the image url should return 200 response )
  if (req.body.incontact) query.contacts_exchanged = { $exists : true, $gt: 0 };
  if (req.body.favourite) query.favourite = { $exists : true, $in: ["true", true] };

  let age = {} // checking for age limits
  const minage = (req.body.minage > LIMITS.AGE.MIN) ? req.body.minage-1 : LIMITS.AGE.MIN;
  const maxage = (req.body.maxage < LIMITS.AGE.MAX) ? parseInt(req.body.maxage)+1 : 0;
  age.$gt = (LIMITS.AGE.MIN <= minage < LIMITS.AGE.MAX) ? minage : LIMITS.AGE.MIN;
  if (maxage) {
    if (maxage > minage) age.$lt = maxage;
  }
  query.age = age ? age : '';

  let height = {}  // checking for height limits
  const minheight = (req.body.minheight > LIMITS.HEIGHT.MIN) ? req.body.minheight-1 : LIMITS.HEIGHT.MIN;
  const maxheight = (req.body.maxheight < LIMITS.HEIGHT.MAX) ? parseInt(req.body.maxheight)+1 : 0;
  height.$gt = (LIMITS.HEIGHT.MIN <= minheight < LIMITS.HEIGHT.MAX) ? minheight : LIMITS.HEIGHT.MIN;
  if (maxheight) {
    if (maxheight > minheight) height.$lt = maxheight;
  }
  query.height_in_cm = height ? height : ''

  let score = {} // checking for score limits
  const minscore = req.body.minscore ? parseFloat(req.body.minscore)-0.01 : LIMITS.SCORE.MIN;
  const maxscore = (parseFloat(req.body.maxscore) < LIMITS.SCORE.MAX) ? parseFloat(req.body.maxscore)+0.01 : LIMITS.SCORE.MAX;
  if (LIMITS.SCORE.MIN <= minscore) {
    if (minscore < LIMITS.SCORE.MAX) score.$gt = minscore;
  }
  if (maxscore) {
    if (maxscore > minscore) score.$lt = maxscore;
  }
  if (score) query.compatibility_score = score

  // appending query with geo targeting
  if (req.body.lng && req.body.lat) {
    // checking for range limit first
    let maxdist = (parseInt(req.body.range) < LIMITS.RANGE.MAX) ? parseInt(req.body.range)*1000 : LIMITS.RANGE.MAX;
    if (maxdist <= LIMITS.RANGE.MIN) maxdist = LIMITS.RANGE.MIN;

    query.location = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [req.body.lng, req.body.lat]
        },
        $maxDistance: maxdist
      }
    }
  }

  Person.find(query).exec((error, list) => {
    if (error) res.status(400).json(error)
    res.status(200).json(list)
  });
});

app.listen(process.env.PORT || 8081)

module.exports = app
