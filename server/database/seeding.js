module.exports = {
  persons_seeding: function(model, data) {
    let output = '';
    if (Array.isArray(data)) {
      if (data.length > 0) {
        data.forEach ((item) => {
          let person = new model({
            display_name: item.display_name,
            age: item.age,
            job_title: item.job_title,
            height_in_cm: item.height_in_cm,
            city: item.city.name,
            location: {
              type : "Point",
              coordinates: [item.city.lon, item.city.lat]
            },
            main_photo: item.main_photo,
            compatibility_score: item.compatibility_score,
            contacts_exchanged: item.contacts_exchanged,
            favourite: item.favourite,
            religion: item.religion
          });
          person.save((err, res) => {
            if (err) {
              output += 'Failed to save object named: ' + item.display_name + ' with error: ' + err + '\n';
            } else {
              output += res + '\n';
            }
          });
        });
      } else {
        output = 'Given array is empty';
      }
    } else {
      output = 'Given object is not an Array';
    }
    return output;
  }
};
