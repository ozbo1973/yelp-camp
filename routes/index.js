//index for Routes
const landing = require("./landing"),
  campgrounds = require("./campgrounds"),
  comments = require("./comments"),
  profile = require("./profile");

module.exports = app => {
  landing(app);
  campgrounds(app);
  comments(app);
  profile(app);
};
