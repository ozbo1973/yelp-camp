//profile routes
const passport = require("passport"),
  { route, isLoggedIn, profileOwner } = require("../middleware"),
  { User, Campground } = require("../models");

r = route("profile", "campgrounds");

module.exports = app => {
  // login
  app.get(r.i, (req, res) => {
    res.render(r.view("index"));
  });

  //authenticate login
  app.post(
    r.i + "/login",
    passport.authenticate("local", {
      successRedirect: r.redirectHome(""),
      failureRedirect: r.rt("index")
    }),
    (req, res) => {
      res.redirect(r.redirectHome(""));
    }
  );

  //logout
  app.get(r.i + "/logout", (req, res) => {
    req.logout;
    res.redirect("/");
  });

  //add new user and authenticate - new
  app.get(r.n, (req, res) => {
    res.render(r.view("new"));
  });

  //create new user - create
  app.post(r.c, (req, res) => {
    const { username, avatar, firstname, lastname, email, isAdmin } = req.body;
    const newUser = new User({ username, avatar, firstname, lastname, email });
    if (isAdmin === process.env.ADMIN_CODE) {
      newUser.isAdmin = true;
    }

    User.register(newUser, req.body.password, (err, user) => {
      if (err) {
        console.log(err);
        return res.redirect("/");
      }
      passport.authenticate("local")(req, res, () => {
        //req.flash("success", "Welcome to YelpCamp " + user.username);
        res.redirect(r.redirectHome());
      });
    });
  });

  //show the profile - show
  app.get(r.s(), isLoggedIn, (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
      if (err) {
        console.log(err.message);
        return res.redirect(r.redirectHome());
      }
      //find all users campgrounds
      Campground.find()
        .where("author.id")
        .equals(foundUser._id)
        .exec((err, userCamps) => {
          if (err) {
            console.log(err.message);
            return res.redirect("back");
          }
          res.render(r.view("show"), { foundUser, userCamps });
        });
    });
  });

  //edit profile - edit
  app.get(r.e(), isLoggedIn, profileOwner, (req, res) => {
    res.render(r.view("edit"));
  });

  //update profile - update
  app.put(r.u(), isLoggedIn, profileOwner, (req, res) => {
    const { username, avatar, firstname, lastname, email } = req.body;
    User.findByIdAndUpdate(
      req.params.id,
      { username, avatar, firstname, lastname, email },
      (err, updatedUser) => {
        if (err) {
          console.log(err.message);
          return redirect("back");
        }
        res.redirect(r.redirectUpdate(updatedUser._id));
      }
    );
  });

  //delete profile - delete
  app.delete(r.d(), isLoggedIn, profileOwner, (req, res) => {
    User.findByIdAndRemove(req.params.id, err => {
      if (err) {
        console.log(err.message);
        return res.redirect("back");
      }
      req.logout;
      res.redirect("/");
    });
  });
};
