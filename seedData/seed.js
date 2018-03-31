//seed the database for development
const mongoose = require("mongoose"),
  NodeGeocoder = require("node-geocoder"),
  keys = require("../config"),
  { Campground, Comment, User } = require("../models"),
  data = require("./data");

//for geo coder
const options = {
    provider: "google",
    httpAdapter: "https",
    apiKey: keys.GEO_CODE_API_KEY,
    formatter: null
  },
  geocoder = NodeGeocoder(options);

module.exports = () => {
  Campground.remove({}, err => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("Campground removed");

    Comment.remove({}, err => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log("Comment Removed");

      //*******populate database
      data.forEach(seed => {
        geocoder.geocode(seed.location, function(err, data) {
          seed.lat = data[0].latitude;
          seed.lng = data[0].longitude;
          seed.location = data[0].formattedAddress;
          Campground.create(seed, (err, campCreated) => {
            if (err) {
              console.log(err.message);
              return;
            }
            Comment.create(
              {
                text: "This is the place to Camp",
                author: { id: "5ab671781c6b6216e437287c", username: "ozbo1973" }
              },
              (err, commentCreated) => {
                if (err) {
                  console.log(err.message);
                  return;
                }
                campCreated.comments.push(commentCreated);
                campCreated.save();
              }
            );
            //createcomment
          });
        });
        //create campground
      });
      //forEach
      console.log("Database seeded");
    });
  });
};
