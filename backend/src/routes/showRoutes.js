const express = require('express');
const showController = require('../controller/showController');

const router = express.Router();

router.get('/', showController.getAllShows);
router.get('/:id', showController.getShowById);
router.get('/:id/episodes', showController.getEpisodes);

module.exports = router;
