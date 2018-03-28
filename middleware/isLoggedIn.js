// check to see if user is logged in and if not
// redirect back to login

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You must log in");
  res.redirect("/profile");
};
