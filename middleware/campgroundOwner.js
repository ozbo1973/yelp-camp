//check to see if the campground owner for route action privleges
const { Campground } = require("../models");

module.exports = (req, res, next) => {
  Campground.findById(req.params.id, (err, foundCamp) => {
    if (err) {
      console.log(err.message);
      return res.redirect("back");
    }
    if (foundCamp.author.id.equals(req.user.id) || req.user.isAdmin) {
      return next();
    }
    console.log("You are not the owner");
    return res.redirect("back");
  });
};
