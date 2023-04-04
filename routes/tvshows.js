const { getAllTvshows, createTvshow } = require('../controllers/tvshows');

const router = require('express').Router();

router.get('/tvshows', getAllTvshows);
router.post('/tvshows', createTvshow);

module.exports = router;