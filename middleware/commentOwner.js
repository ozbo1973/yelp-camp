//check the owner of the comment for privleges
const { Campground, Comment } = require("../models");

module.exports = (req, res, next) => {
  Comment.findById(req.params.commentID, (err, foundComment) => {
    if (err) {
      console.log(err.message);
      return res.redirect("back");
    }

    if (foundComment.author.id.equals(req.user.id) || req.user.isAdmin) {
      return next();
    }
    return res.redirect("back");
  });
};
