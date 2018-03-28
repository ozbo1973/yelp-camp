// comments routes

const { Campground, Comment, User } = require("../models"),
  { route, isLoggedIn, commentOwner } = require("../middleware");

const r = route("comments", "campgrounds");

module.exports = app => {
  // new comments
  app.get(r.homeDirID + r.n, isLoggedIn, (req, res) => {
    res.render(r.view("new"), { camp: req.params.id });
  });

  //create new comment
  app.post(r.homeDirID + r.c, isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campFound) => {
      if (err || !campFound) {
        req.flash("error", err.message || "Campground not found.");
        return res.redirect("back");
      }

      Comment.create(
        {
          text: req.body.comment.text,
          author: {
            id: req.user._id,
            username: req.user.username
          }
        },
        (err, commentCreated) => {
          if (err || !commentCreated) {
            req.flash("error", err.message || "Comment not created");
            return res.redirect("back");
          }
          commentCreated.save();
          campFound.comments.push(commentCreated._id);
          campFound.save();
          req.flash("success", "Comment created.");
          res.redirect(r.redirectHome(req.params.id));
        }
      );
    });
  });

  //edit comments
  app.get(
    r.homeDirID + r.e("commentID"),
    isLoggedIn,
    commentOwner,
    (req, res) => {
      Comment.findById(req.params.commentID, (err, foundComment) => {
        if (err || !foundComment) {
          req.flash("error", err.message || "Comment not found.");
          return res.redirect("back");
        }
        res.render(r.view("edit"), { foundComment, campID: req.params.id });
      });
    }
  );

  //update comments
  app.put(
    r.homeDirID + r.u("commentID"),
    isLoggedIn,
    commentOwner,
    (req, res) => {
      Comment.findByIdAndUpdate(
        req.params.commentID,
        req.body.comment,
        (err, editedComment) => {
          if (err || !editedComment) {
            req.flash("error", err.message || "Comment not found.");
            return res.redirect("back");
          }
          req.flash("success", "Comment has been edited.");
          res.redirect(r.redirectHome(req.params.id));
        }
      );
    }
  );

  //destroy comments
  app.delete(
    r.homeDirID + r.d("commentID"),
    isLoggedIn,
    commentOwner,
    (req, res) => {
      Comment.findByIdAndRemove(req.params.commentID, err => {
        if (err) {
          req.flash("error", err.message);
          return res.redirect("back");
        }
        req.flash("success", "Comment has been deleted.");
        res.redirect(r.redirectHome(req.params.id));
      });
    }
  );
};
