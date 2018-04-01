const express = require("express"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override");

module.exports = app => {
  //config
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride("_method"));
  app.set("view engine", "ejs");
};
