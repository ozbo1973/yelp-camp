const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: String,
  createdAt: { type: Date, default: Date.now },
  location: String,
  lat: Number,
  lng: Number,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Campground", campgroundSchema);
