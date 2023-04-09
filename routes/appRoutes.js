const { handleHomeRequest, handleNotFound } = require("../controllers/appController");

const router = require("express").Router();

router.get('/', handleHomeRequest);
router.get('*', handleNotFound);

module.exports = router;