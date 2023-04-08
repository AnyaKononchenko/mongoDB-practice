const mongoose = require("mongoose");

const tvshowSchema = new mongoose.Schema({
  id: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: [true, "TV-show has to have an ID"],
  },
  title: {
    type: String,
    minlength: [3, "The title is too short"],
    maxlength: [200, "The title is too long"],
    required: [true, "TV-show has to have a title"],
  },
  release: {
    type: Number,
    min: [1970, "Please, add a tv-show released after 1970"],
    max: [new Date().getFullYear(), "Only already aired show can be added"],
    required: [true, "TV-show has to have a release year"],
  },
  seasons: {
    type: Number,
    min: 1,
    required: [true, "TV-show has to have a number of seasons"],
  },
  genre: [
    {
      type: String,
      enum: [
        "Drama",
        "Sitcom",
        "Mystery",
        "Suspence",
        "Horror",
        "Thriller",
        "Anime",
        "Adventure",
        "Science Fiction",
        "Fantasy",
        "Comedy",
        "Unknown",
      ],
      required: [true, "TV-show has to have a genre"],
    },
  ],
  createdOn: { type: Date, default: Date.now },
});

const Tvshow = mongoose.model("tvshow", tvshowSchema);

module.exports = Tvshow;
