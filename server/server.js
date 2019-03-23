const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // backend and frontend served at different ports - CORS case
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined')); // use morgan console logger in dev environment
}

const db = require('./database/connect');
const Person = require('./models/persons');
// DB Setup

// SERVER Setup
app.get('/', (req, res) => res.status(200).send('API is running'));
                                // just indicates that API server is up and running

app.post('/', (req, res) => {   // return all persons if request body is empty or
                                // direct filter result with combination of fields
                                // that have values to use as search params
  let query = req.body ? req.body : {}
  Person.find( query ).sort({ display_name: 1 }).exec((error, list) => {
    if (error) res.status(400).json(error)
    res.status(200).json(list)
  });
});

app.get('/clear', (req, res) => { // service route cleaning the collection
  Person.deleteMany({}).exec((error, ret) => {
    if (error) res.status(400).json(error)
    res.status(200).json(ret)
  });
});

app.post('/filter', (req, res) => { // actual filter route
  let query = {} // compiling query
  const helpers = require('./helpers');

  // checking for boolean filter options
  if (req.body.hasphoto === true)  query.main_photo = { $exists : true };  // to be absolutely graceful
                                                                  // we should check if http request
                                                                  // of the image url should
                                                                  // return 200 response )
  if (req.body.incontact === true) query.contacts_exchanged = { $exists : true, $gt: 0 };
  if (req.body.favourite === true) query.favourite = { $exists : true, $in: ["true", true] };

  query.age = helpers.check_limits( // append query with age
    { MIN: 18, MAX: 95 },
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
    { MIN: 135, MAX: 210 },
    'int',
    {
      value: req.body.minheight,
      must: true,
      over: false
    },
    {
      value: req.body.maxheight,
      must: false,
      over: true
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

  if (req.body.lng && req.body.lat) {
    query.location = helpers.append_geo( // append query with geo point and range
      { MIN: 30, MAX: 300 },
      req.body.lng,
      req.body.lat,
      req.body.range
    );
  }

console.log(query);

  Person.find(query).exec((error, list) => {
    if (error) res.status(400).json(error)
    res.status(200).json(list)
  });
});

app.listen(process.env.PORT || 8081);

module.exports = app;
