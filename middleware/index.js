//routes index
const route = require("./rootRoute"),
  isLoggedIn = require("./isLoggedIn"),
  isAdmin = require("./isAdmin"),
  profileOwner = require("./profileOwner"),
  campgroundOwner = require("./campgroundOwner"),
  commentOwner = require("./commentOwner");

module.exports = {
  route,
  isLoggedIn,
  isAdmin,
  profileOwner,
  campgroundOwner,
  commentOwner
};
