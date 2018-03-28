//checks to see if user is an admin
//if so will move next on admin items

module.exports = (req, res, next) => {
  if (req.user.id && req.user.isAdmin) {
    return next();
  }
  req.flash("error", "You do not have Admin Permissions");
  res.redirect("back");
};
