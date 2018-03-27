const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  { Campground, Comment, User } = require("./models"),
  seedDB = require("./seedData/seed"),
  app = express(),
  dbURL = process.env.DBURL || "mongodb://localhost/yelp_camp",
  PORT = process.env.PORT || 3000;

//config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.locals.moment = require("moment");

//DB connection
if (process.env.ENVIRONMENT !== "production") {
  seedDB();
}
mongoose.connect(dbURL);

//passport
app.use(
  require("express-session")({
    secret: "abdiciiseksioifdioaoisiadil",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//local variables
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//Routes
app.get("/", (req, res) => {
  res.render("landing", { page: "landing" });
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
