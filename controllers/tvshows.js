const Tvshow = require("../models/tvshows");
const { v4: uuidv4 } = require("uuid");

/**
 * @openapi
 * components:
 *   schemas:
 *     Tvshow:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: The Last of Us
 *         release:
 *           type: integer
 *           minimum: 1970
 *           maximum: 2023
 *           example: 2023
 *         seasons:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *             enum: [ "Drama", "Sitcom", "Mystery", "Suspence", "Horror", "Thriller", "Anime", "Adventure", "Science Fiction","Fantasy","Comedy","Unknown"]
 *           example: ["Drama"]
 *       required:
 *         - title
 *         - release
 *         - seasons
 *         - genre
 *     Message:
 *       type: object
 *       properties:
 *         message: 
 *           type: string
 *           example: "Custom response from the server"
 */

/**
 * @openapi
 * tags: 
 *   name: TV-shows
 *   decription: A collection of TV-shows
 */

/**
 * @openapi
 * /tvshows :
 *   get:
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           enum: [title, release, seasons, genre]
 *         description: Search field
 *       - in: query
 *         name: value
 *         schema:
 *           type: string
 *         description: Search parameter
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Number of page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of documents per page
 *     summary: get all tv-shows
 *     tags: [TV-shows]
 *     description: Returns all available documents in MongoDB
 *     responses:
 *       200:
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tvshow'
 *       401:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */

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
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

/**
 * @openapi
 * /tvshow :
 *   get:
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: The ID of the tv-show to return
 *     summary: get a single tv-show by ID
 *     tags: [TV-shows]
 *     description: Returns one tv-show based on ID
 *     responses:
 *       200:
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tvshow'
 *       404:
 *         description: TV-show is not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
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
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

/**
 * @openapi
 * /tvshow :
 *   put:
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: The ID of the tv-show to be updated
 *     summary: update a tv-show by ID
 *     tags: [TV-shows]
 *     description: Updates a tv-show based on ID
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tvshow'
 *     responses:
 *       201:
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tvshow'
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal Server Error.
*         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
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
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

/**
 * @openapi
 * /tvshow :
 *   delete:
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: The ID of the tv-show to be deleted
 *     summary: delete a tv-show by ID
 *     tags: [TV-shows]
 *     description: Deletes a tv-show based on ID
 *     responses:
 *       201:
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
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
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

/**
 * @openapi
 * /tvshows :
 *   post:
 *     summary: create a tv-show
 *     tags: [TV-shows]
 *     description: Creates a new tv-show
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tvshow'
 *     responses:
 *       201:
 *         description: Created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tvshow'
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
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
    res.status(201).json({ message: "The tv-show is created", tvshow });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

module.exports = {
  getAllTvshows,
  getTvshow,
  updateTvshow,
  deleteTvshow,
  createTvshow,
};
