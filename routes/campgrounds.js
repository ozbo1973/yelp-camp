//campgrounds route

const { route, isLoggedIn, campgroundOwner } = require("../middleware"),
  { Campground } = require("../models");

const r = route("campgrounds", "campgrounds");

module.exports = app => {
  //campground index
  app.get(r.i, (req, res) => {
    Campground.find({}, (err, camps) => {
      if (err) {
        console.log(err.message);
        return res.redirect(r.redirectHome());
      }
      res.render(r.view("index"), { camps });
    });
  });

  // Campground new
  app.get(r.n, isLoggedIn, (req, res) => {
    res.render(r.view("new"));
  });

  // Campground create
  app.post(r.c, isLoggedIn, (req, res) => {
    Campground.create(req.body.camp, (err, campCreated) => {
      if (err) {
        console.log(err.message);
        return res.redirect("back");
      }
      res.redirect(r.redirectHome(""));
    });
  });

  //campground show
  app.get(r.s(), isLoggedIn, (req, res) => {
    Campground.findById(req.params.id)
      .populate("comments")
      .exec((err, foundCamp) => {
        if (err) {
          console.log(err.message);
          return res.redirect(r.redirectHome());
        }
        res.render(r.view("show"), { foundCamp });
      });
  });

  //campground edit
  app.get(r.e(), isLoggedIn, campgroundOwner, (req, res) => {
    Campground.findById(req.params.id, (err, foundCamp) => {
      if (err) {
        console.log(err.message);
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
        if (err) {
          console.log(err.message);
          return res.redirect("back");
        }
        res.redirect(r.redirectHome(req.params.id));
      }
    );
  });

  //campground destroy
  app.delete(r.d(), isLoggedIn, campgroundOwner, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, err => {
      if (err) {
        console.log(err.message);
        return res.redirect("back");
      }
      res.redirect(r.redirectHome());
    });
  });
};
