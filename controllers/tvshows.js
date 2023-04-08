const Tvshow = require("../models/tvshowModel");
const { v4: uuidv4 } = require("uuid");

const getAllTvshows = async (req, res) => {
  try {
    const { page = 1, limit, sort, order, search, value } = req.query;
    const tvshows = await Tvshow.find({ [search]: value })
      .sort({ [sort]: order === "desc" ? -1 : 1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select({ _id: 0, __v: 0, createdOn: 0 });
    if (!tvshows)
      return res.status(401).json({ message: "Couldn't get these shows" });
    res
      .status(200)
      .json({ message: "Successfully fetched the tv-shows", tvshows });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
};

const getTvshow = async (req, res) => {
  try {
    const tvshow = await Tvshow.findOne(
      { id: req.query.id },
      { _id: 0, createdOn: 0 }
    );
    if (!tvshow)
      return res
        .status(404)
        .json({ message: "There is no tv-show with this id.." });
    res.status(200).json({ message: "Success!", tvshow });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
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
    if (!tvshow) {
      return res.status(400).json({ message: "Couldn't update this tv-show" });
    }
    res.status(201).json({ message: "The tv-show is updated", tvshow });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
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
    res.status(201).json({ message: "The tv-show was deleted" });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
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
    res.status(201).json({ message: "The tv-show is created" });
  } 
  catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
};

module.exports = {
  getAllTvshows,
  getTvshow,
  updateTvshow,
  deleteTvshow,
  createTvshow,
};
