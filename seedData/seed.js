//seed the database for dev
const mongoose = require("mongoose"),
  { Campground, Comment, User } = require("../models"),
  data = require("./data");

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
        Campground.create(seed, (err, campCreated) => {
          if (err) {
            console.log(err.message);
            return;
          }
          Comment.create(
            {
              text: "This is the place to Camp",
              author: { id: "5a9a13d5cd256702548e7abc", username: "ozbo1973" }
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
        //create campground
      });
      //forEach
      console.log("Database seeded");
    });
  });
};
