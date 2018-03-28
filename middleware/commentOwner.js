//check the owner of the comment for privleges
const { Campground, Comment } = require("../models");

module.exports = (req, res, next) => {
  Comment.findById(req.params.commentID, (err, foundComment) => {
    if (err || !foundComment) {
      req.flash("error", err.message || "Comment not found");
      return res.redirect("back");
    }

    if (foundComment.author.id.equals(req.user.id) || req.user.isAdmin) {
      return next();
    }
    req.flash("error", "You are not the owner");
    return res.redirect("back");
  });
};
