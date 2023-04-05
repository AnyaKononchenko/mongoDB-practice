const Tvshow = require("../models/tvshows");
const { v4: uuidv4 } = require("uuid");

const getAllTvshows = async (req, res) => {
  try {
    const tvshows = await Tvshow.find(
      {},
      { title: 1, release: 1, seasons: 1, genre: 1, id: 1, _id: 0 } // basically SELECT: defining fields you want to display
    );
    res.status(200).json({ message: "success: returned all tvshows", tvshows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleTvshow = async (req, res) => {
  try {
    const tvshow = await Tvshow.findOne({ id: req.query.id });
    if (!tvshow) {
      return res
        .status(400)
        .json({ message: "It seems like this tv-show doesn't exist" });
    }
    res
      .status(200)
      .json({ message: "success: here is the tv-show you requested:", tvshow });
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
    });
    const createdTvshow = await tvshow.save();
    if (!createdTvshow) {
      return res
        .status(400)
        .json({ message: "Something went wrong.. Try again later." });
    }
    res.status(201).json({ message: "a tv-show is created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTvshow = async (req, res) => {
  try {
    const tvshow = await Tvshow.deleteOne({ id: req.query.id });
    if (tvshow.deletedCount === 0) {
      return res
        .status(400)
        .json({ message: "It seems like this tv-show doesn't exist" });
    }
    res.status(201).json({ message: "a tv-show is deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTvshow = async (req, res) => {
  try {
    const tvshow = await Tvshow.findOneAndUpdate(
      { id: req.query.id },
      {
        $set: {
          title: req.body.title,
          release: req.body.release,
          seasons: req.body.seasons,
          genre: req.body.genre,
        },
      },
      { new: true }
    );
    if(!tvshow) {
      return res.status(401).json({message: "Couldn't update this tv-show"})
    }
    res.status(201).json({ message: "a tv-show is updated", tvshow });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllTvshows,
  getSingleTvshow,
  createTvshow,
  deleteTvshow,
  updateTvshow,
};
