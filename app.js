const express = require("express"),
  mongoose = require("mongoose"),
  keys = require("./config/keys"),
  app = express(),
  DBURL = keys.DBURL,
  PORT = keys.PORT;

//config
app.use(express.static(__dirname + "/public"));
require("./config/appConfig")(app);

//DB connection
if (process.env.NODE_ENV !== "production") {
  require("./seedData/seed")();
}
mongoose.connect(DBURL);

//passport
require("./services/passport")(app);

// //local variables
require("./middleware/localVars")(app);

// //Routes
require("./routes")(app);
app.get("*", (req, res) => {
  req.flash("error", "Page not found");
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
  if (process.env.NODE_ENV !== "production") {
    // console.log(process.env.NODE_ENV);
  }
});
