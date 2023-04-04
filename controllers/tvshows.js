const Tvshow = require("../models/tvshows");
const {v4 : uuidv4} = require("uuid")

const getAllTvshows = (req, res) => {
  try {
    res.status(200).json({ message: "returned all tvshows" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTvshow = async (req, res) => {
  try {
    const tvshow = new Tvshow({
      id: uuidv4(),
      title: req.body.title,
      release: req.body.release,
      seasons: req.body.seasons,
      genre: req.body.genre,
    })
    await tvshow.save();
    res.status(201).json({ message: "a tv-show is created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllTvshows, createTvshow };
