//seed the database for development
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
        //create campground
      });
      //forEach
      console.log("Database seeded");
    });
  });
};
