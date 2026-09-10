const express = require('express');
const movieController = require('../controller/movieController');

const router = express.Router();

router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);

module.exports = router;
