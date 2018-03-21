//campgrounds route

const { route } = require("../middleware");

const r = route("campgrounds", "campgrounds");

module.exports = app => {
  //campground index
  app.get(r.rt("index"), (req, res) => {
    res.render(r.view("index"));
  });

  // Campground new
  app.get(r.rt("new"), (req, res) => {
    res.render(r.view("new"));
  });

  // Campground create
  app.post(r.rt("create"), (req, res) => {
    res.redirect(r.redirectHome(""));
  });

  //campground show
  app.get(r.rt("show"), (req, res) => {
    res.render(r.view("show"));
  });

  //campground edit
  app.get(r.rt("edit"), (req, res) => {
    res.render(r.view("edit"));
  });

  //campground update
  app.put(r.rt("update"), (req, res) => {
    res.redirect(r.redirectHome(req.params.id));
  });

  //campground destroy
  app.delete(r.rt("destroy"), (req, res) => {
    res.redirect(r.redirectHome());
  });
};
