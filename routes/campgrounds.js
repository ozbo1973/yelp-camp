//campgrounds route

const { route, page, isLoggedIn, campgroundOwner } = require("../middleware"),
  { Campground } = require("../models"),
  keys = require("../config/keys"),
  NodeGeocoder = require("node-geocoder");

const r = route("campgrounds", "campgrounds");

//for geo coder
const options = {
  provider: "google",
  httpAdapter: "https",
  apiKey: keys.GEO_CODE_API_KEY,
  formatter: null
};
const geoSrc = `https://maps.googleapis.com/maps/api/js?key=${
  keys.YELP_API_KEY
}&callback=initMap`;
const geocoder = NodeGeocoder(options);

module.exports = app => {
  //campground index
  app.get(r.i, (req, res) => {
    Campground.find({}, (err, camps) => {
      if (err || !camps) {
        req.flash("error", err.message || "Campgrounds not found.");
        return res.redirect(r.redirectHome());
      }
      res.render(r.view("index"), { camps, navPage: page("home") });
    });
  });

  // Campground new
  app.get(r.n, isLoggedIn, (req, res) => {
    res.render(r.view("new"), { navPage: page("home") });
  });

  // Campground create
  app.post(r.c, isLoggedIn, (req, res) => {
    const newCampground = req.body.camp;
    newCampground.author = { id: req.user._id, username: req.user.username };
    geocoder.geocode(newCampground.location, function(err, data) {
      if (err || !data.length) {
        req.flash("error", err.message || "Invalid address");
        return res.redirect("back");
      }
      newCampground.lat = data[0].latitude;
      newCampground.lng = data[0].longitude;
      newCampground.location = data[0].formattedAddress;

      Campground.create(newCampground, (err, campCreated) => {
        if (err || !campCreated) {
          req.flash("error", err.message || "Campground not Created.");
          return res.redirect("back");
        }

        req.flash("success", "Campground created.");
        res.redirect(r.redirectHome(""));
      });
    });
  });

  //campground show
  app.get(r.s(), isLoggedIn, (req, res) => {
    Campground.findById(req.params.id)
      .populate("comments")
      .exec((err, foundCamp) => {
        if (err || !foundCamp) {
          req.flash("error", err.message || "Campground not found");
          return res.redirect(r.redirectHome());
        }
        res.render(r.view("show"), { foundCamp, geoSrc });
      });
  });

  //campground edit
  app.get(r.e(), isLoggedIn, campgroundOwner, (req, res) => {
    Campground.findById(req.params.id, (err, foundCamp) => {
      if (err || !foundCamp) {
        req.flash("error", err.message || "Campground not found");
        return res.redirect("back");
      }
      res.render(r.view("edit"), { foundCamp });
    });
  });

  //campground update
  app.put(r.u(), isLoggedIn, campgroundOwner, (req, res) => {
    const updateCamp = req.body.camp;
    geocoder.geocode(updateCamp.location, function(err, data) {
      if (err || !data.length) {
        req.flash("error", err.message || "Invalid address");
        return res.redirect("back");
      }
      updateCamp.lat = data[0].latitude;
      updateCamp.lng = data[0].longitude;
      updateCamp.location = data[0].formattedAddress;

      Campground.findByIdAndUpdate(
        req.params.id,
        updateCamp,
        (err, foundCamp) => {
          if (err || !foundCamp) {
            req.flash("error", err.message || "Campground not found");
            return res.redirect("back");
          }
          req.flash("success", "Campground updated");
          res.redirect(r.redirectHome(req.params.id));
        }
      );
    });
  });

  //campground destroy
  app.delete(r.d(), isLoggedIn, campgroundOwner, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, err => {
      if (err) {
        req.flash("error", err.message || "Campground not found");
        return res.redirect("back");
      }
      req.flash("success", "Campground Deleted");
      res.redirect(r.redirectHome());
    });
  });
};
