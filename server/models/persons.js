var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],   // [<longitude>, <latitude>]
    required: true
  }
});

var PersonSchema = new Schema({
  display_name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  job_title: {
    type: String,
    required: true
  },
  height_in_cm: {
    type: Number,
    required: true
  },
  city: {
    name: {
      type: String,
      required: true
    },
    location: PointSchema
  },
  main_photo: {
    type: String
  },
  compatibility_score: {
    type: Number,
    required: true
  },
  contacts_exchanged: {
    type: Number,
    required: true
  },
  favourite: {
    type: Boolean,
    required: true
  },
  religion: {
    type: String,
    required: true
  }
});

PersonSchema.index({ "city.location": "2dsphere"});   // create the geospatial index

var Person = mongoose.model("Person", PersonSchema);
module.exports = Person;
