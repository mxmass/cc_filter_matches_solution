const Person = require("./models/persons");

const data = require('./database/matches.json');
const matches = data.matches;

if (Array.isArray(matches)) {
  if (matches.length > 0) {
    matches.forEach ((item) => {
      let person = new Person({
        display_name: item.display_name,
        age: item.age,
        job_title: item.job_title,
        height_in_cm: item.height_in_cm,
        city: {
          name: item.city.name,
          location: {
            type : "Point",
            coordinates: [item.city.lon, item.city.lat]
          }
        },
        main_photo: item.main_photo,
        compatibility_score: item.compatibility_score,
        contacts_exchanged: item.contacts_exchanged,
        favourite: item.favourite,
        religion: item.religion
      });
      person.save((err, res) => {
        if (err) {
          console.log('Failed to save object named: ' + item.display_name + ' with error: ' + err);
        }
      });
    });
  } else {
    console.log('Array is empty');
  }
} else {
  console.log('Input object is not an Array');
}
