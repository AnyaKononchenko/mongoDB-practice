const mongoose = require("mongoose");

const tvshowsSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  release: { type: Number, required: true },
  seasons: { type: Number, required: true },
  genre: { type: String, required: true },
  addedOn: { type: Date, default: Date.now },
});

const Tvshow = mongoose.model("tvshow", tvshowsSchema);

module.exports = Tvshow;
