const passport = require("passport"),
  LocalStrategy = require("passport-local"),
  User = require("../models/userSchema");
keys = require("../config/keys");

//passport
module.exports = app => {
  app.use(
    require("express-session")({
      secret: keys.APP_SECRET,
      resave: false,
      saveUninitialized: false
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};
