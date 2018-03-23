const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  app = express(),
  dbURL = process.env.DBURL || "mongodb://localhost/yelp_camp",
  PORT = process.env.PORT || 3000;

//config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

//DB connection
mongoose.connect(dbURL);

//Route
app.get("/", (req, res) => {
  res.render("landing");
});

//import routes
require("./routes/campgrounds")(app);
require("./routes/comments")(app);
require("./routes/profile")(app);

//CATCH ALL
app.get("*", (req, res) => {
  res.send("set up *");
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
