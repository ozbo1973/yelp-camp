//profile routes
const { route } = require("../middleware");

r = route("profile", "campgrounds");

module.exports = app => {
  // login
  app.get(r.rt("index"), (req, res) => {
    res.render(r.view("index"));
  });

  //authenticate
  app.post(r.rt("index") + "/login", (req, res) => {
    res.send("logged in");
  });

  //add new user and authenticate - new
  app.get(r.rt("new"), (req, res) => {
    res.render(r.view("new"));
  });

  //create new user - create
  app.post(r.rt("create"), (req, res) => {
    res.send("Profile Created");
  });

  //show the profile - show
  app.get(r.rt("show"), (req, res) => {
    res.render(r.view("show"));
  });

  //edit profile - edit
  app.get(r.rt("edit"), (req, res) => {
    res.render(r.view("edit"));
  });

  //update profile - update
  app.put(r.rt("update"), (req, res) => {
    res.send("profile updated");
  });

  //delete profile - delete
  app.delete(r.rt("destroy"), (req, res) => {
    res.send("profile deleted");
  });
};
