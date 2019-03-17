const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const Person = require("./models/persons");
// DB Setup
const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL || 'localhost'
const DATABASE = process.env.DATABASE || 'persons'
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
  console.log("MongoDB connection established");

  // seeding DB if it's empty
  Person.count({}, (err, count) => {
    if (count === 0) {
      require('./seeding')
    } else {
      console.log('Collection is already seeded with ' + count + ' objects');
    }
  });
});

// SERVER Setup
app.get('/', (req, res) => res.send('API is running'));

app.listen(process.env.PORT || 8081)
