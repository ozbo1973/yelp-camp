//profile routes
const passport = require("passport"),
  { route, page, isLoggedIn, profileOwner } = require("../middleware"),
  { User, Campground } = require("../models");

r = route("profile", "campgrounds");

module.exports = app => {
  // login
  app.get(r.i, (req, res) => {
    res.render(r.view("index"), { navPage: page("login") });
  });

  //authenticate login
  app.post(
    r.i + "/login",
    passport.authenticate("local", {
      successRedirect: r.homeDir,
      failureRedirect: r.i,
      failureFlash: true
    }),
    (req, res) => {
      res.redirect(r.redirectHome(""));
    }
  );

  //logout
  app.get(r.i + "/logout", (req, res) => {
    const user = req.user.username;
    req.logout();
    req.flash("success", user + " has logged out");
    res.redirect("/");
  });

  //add new user and authenticate - new
  app.get(r.n, (req, res) => {
    res.render(r.view("new"), { navPage: page("signup") });
  });

  //create new user - create
  app.post(r.c, (req, res) => {
    const { username, avatar, firstname, lastname, email, isAdmin } = req.body;
    const newUser = new User({ username, avatar, firstname, lastname, email });
    if (isAdmin === process.env.ADMIN_CODE) {
      newUser.isAdmin = true;
    }

    User.register(newUser, req.body.password, (err, user) => {
      if (err || !user) {
        req.flash("error", err.message || "User not Created.");
        return res.redirect("/");
      }
      passport.authenticate("local")(req, res, () => {
        req.flash("success", "Welcome to YelpCamp " + user.username);
        res.redirect(r.redirectHome());
      });
    });
  });

  //show the profile - show
  app.get(r.s(), isLoggedIn, (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
      if (err || !foundUser) {
        req.flash("error", err.message || "User Profile not found.");
        return res.redirect(r.redirectHome());
      }
      //find all users campgrounds
      Campground.find()
        .where("author.id")
        .equals(foundUser._id)
        .exec((err, userCamps) => {
          if (err || !userCamps) {
            req.flash("error", "Users posted Campgrounds Not found.");
            return res.redirect("back");
          }
          res.render(r.view("show"), {
            foundUser,
            userCamps,
            navPage: page("profile")
          });
        });
    });
  });

  //edit profile - edit
  app.get(r.e(), isLoggedIn, profileOwner, (req, res) => {
    res.render(r.view("edit"), { navPage: page("profile") });
  });

  //update profile - update
  app.put(r.u(), isLoggedIn, profileOwner, (req, res) => {
    const { username, avatar, firstname, lastname, email } = req.body;
    User.findByIdAndUpdate(
      req.params.id,
      { username, avatar, firstname, lastname, email },
      (err, updatedUser) => {
        if (err || !updatedUser) {
          req.flash("error", err.message || "Profile not found.");
          return redirect("back");
        }
        req.flash("success", "Profile updated.");
        res.redirect(r.redirectUpdate(updatedUser._id));
      }
    );
  });

  //delete profile - delete
  app.delete(r.d(), isLoggedIn, profileOwner, (req, res) => {
    const user = req.user.username;
    User.findByIdAndRemove(req.params.id, err => {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("back");
      }
      req.logout;
      req.flash("success", user + "'s profile has been deleted.");
      res.redirect("/");
    });
  });
};
