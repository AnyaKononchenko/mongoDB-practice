const { getAllTvshows, createTvshow, getTvshow, deleteTvshow, updateTvshow } = require('../controllers/tvshows');
const { isTvshowAlreadyCreated } = require('../middleware/tvshows');

const router = require('express').Router();

router.get('/tvshows', getAllTvshows);
router.post('/tvshows', isTvshowAlreadyCreated, createTvshow);
router.get('/tvshow', getTvshow);
router.delete('/tvshow', deleteTvshow);
router.put('/tvshow', updateTvshow);

module.exports = router;