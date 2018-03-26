//check to see if admin or profile owner

module.exports = (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    return next();
  }
  res.redirect("back");
};
