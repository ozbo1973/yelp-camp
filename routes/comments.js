// comments routes

const { route } = require("../middleware");

const r = route("comments", "campgrounds");

module.exports = app => {
  // new comments
  app.get(r.homeDirID + r.rt("new"), (req, res) => {
    res.render(r.view("new"));
  });

  //create new comment
  app.post(r.homeDirID + r.rt("create"), (req, res) => {
    res.redirect(r.redirectHome(req.params.id));
  });

  //edit comments
  app.get(r.homeDirID + r.rt("edit", "commentID"), (req, res) => {
    res.render(r.view("edit"));
  });

  //update comments
  app.put(r.homeDirID + r.rt("update", "commentID"), (req, res) => {
    res.redirect(r.redirectHome(req.params.id));
  });

  //destroy comments
  app.delete(r.homeDirID + r.rt("destroy", "commentID"), (req, res) => {
    res.redirect(r.redirectHome());
  });
};
