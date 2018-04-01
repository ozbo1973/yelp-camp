const flash = require("connect-flash");

//local variables
module.exports = app => {
  app.use(flash());
  app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.errMsg = req.flash("error");
    res.locals.successMsg = req.flash("success");
    res.locals.moment = require("moment");
    next();
  });
};
