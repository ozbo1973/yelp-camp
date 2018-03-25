//campgrounds route

const { route } = require("../middleware"),
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
  app.get(r.n, (req, res) => {
    res.render(r.view("new"));
  });

  // Campground create
  app.post(r.c, (req, res) => {
    res.redirect(r.redirectHome(""));
  });

  //campground show
  app.get(r.s(), (req, res) => {
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
  app.get(r.e(), (req, res) => {
    res.render(r.view("edit"));
  });

  //campground update
  app.put(r.u(), (req, res) => {
    res.redirect(r.redirectHome(req.params.id));
  });

  //campground destroy
  app.delete(r.d(), (req, res) => {
    res.redirect(r.redirectHome());
  });
};
