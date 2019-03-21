const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined')); // use morgan console logger in dev environment
}

const db = require('./database/connect');
const Person = require('./models/persons');
// DB Setup

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
  let query = {} // compiling query
  const helpers = require('./helpers/limits');

  // checking for boolean filter options
  if (req.body.hasphoto)  query.main_photo = { $exists : true };   // to be absolutely graceful we should check if http request of the image url should return 200 response )
  if (req.body.incontact) query.contacts_exchanged = { $exists : true, $gt: 0 };
  if (req.body.favourite) query.favourite = { $exists : true, $in: ["true", true] };

  query.age = helpers.check_limits( // append query with age
    { MIN: 17, MAX: 96 },
    'int',
    {
      value: req.body.minage,
      must: true,
      over: false
    },
    {
      value: req.body.maxage,
      must: false,
      over: true
    }
  );

  query.height_in_cm = helpers.check_limits( // append query with height
    { MIN: 134, MAX: 211 },
    'int',
    {
      value: req.body.minheight,
      must: true,
      over: false
    },
    {
      value: req.body.maxheight,
      must: false,
      over: false
    }
  );

  query.compatibility_score = helpers.check_limits( // append query with score
    { MIN: 0, MAX: 1 },
    'float',
    {
      value: req.body.minscore,
      must: true,
      over: false
    },
    {
      value: req.body.maxscore,
      must: true,
      over: false
    }
  );

  if (req.body.lng && req.body.lat) { // appending query with geo range
    // checking for range limit first, set maxdist to max limit if not given
    const LIMITS = { MIN: 30000, MAX: 300000 }
    const range = parseInt(req.body.range);

    let maxdist = (range < LIMITS.MAX) ? range*1000 : LIMITS.MAX;
    if (maxdist <= LIMITS.MIN) maxdist = LIMITS.MIN;

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

app.listen(process.env.PORT || 8081);

module.exports = app;
