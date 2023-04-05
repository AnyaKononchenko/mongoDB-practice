const Tvshow = require("../models/tvshows");

const isTvshowAlreadyCreated = async (req, res, next) => {
  const isExist = await Tvshow.findOne({ title: req.body.title });
  if (isExist) {
    return res.status(400).json({
      message: "Show with this title already exists",
      tvshow: isExist,
    });
  }
  next();
};

module.exports = { isTvshowAlreadyCreated };
