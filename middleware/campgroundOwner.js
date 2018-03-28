//check to see if the campground owner for route action privleges
const { Campground } = require("../models");

module.exports = (req, res, next) => {
  Campground.findById(req.params.id, (err, foundCamp) => {
    if (err || !foundCamp) {
      req.flash("error", err.message || "Campground not found");
      return res.redirect("back");
    }
    if (foundCamp.author.id.equals(req.user.id) || req.user.isAdmin) {
      return next();
    }
    req.flash("error", "You are not the owner.");
    return res.redirect("back");
  });
};
