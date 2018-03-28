//campgrounds route

const { route, page, isLoggedIn, campgroundOwner } = require("../middleware"),
  { Campground } = require("../models");

const r = route("campgrounds", "campgrounds");

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
    Campground.create(req.body.camp, (err, campCreated) => {
      if (err || !campCreated) {
        req.flash("error", err.message || "Campground not Created.");
        return res.redirect("back");
      }
      req.flash("success", "Campground created.");
      res.redirect(r.redirectHome(""));
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
        res.render(r.view("show"), { foundCamp });
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
    Campground.findByIdAndUpdate(
      req.params.id,
      req.body.camp,
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
