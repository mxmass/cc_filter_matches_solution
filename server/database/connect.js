const Person = require('../models/persons');
const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL || 'localhost';
const DATABASE = process.env.DATABASE || 'persons';
const MONGO_CONFIG = {
  useCreateIndex: true,
  useNewUrlParser: true
}


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
  console.error("MongoDB connection established");
  // seeding DB if it's empty, if you won't clean collection - it happen once otherwise call "/clean" route and then restart the server
  Person.countDocuments({}, (err, cnt) => {
    if (cnt === 0) {
      try {
        const matches = require('./matches.json').matches;
        const seeding = require('./seeding');
        const res = seeding.persons_seeding(Person, matches);
      } catch(error) {
        console.log(error);
      }
    } else {
      console.log('Collection already seeded with ' + cnt + ' objects');
    }
  });
});

module.exports = db;
