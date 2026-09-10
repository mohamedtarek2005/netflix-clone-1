const express = require('express');
const watchlistController = require('../controller/watchlistController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.use(authenticate);
router.get('/', watchlistController.getWatchlist);
router.post('/', watchlistController.addToWatchlist);
router.delete('/:id', watchlistController.removeFromWatchlist);

module.exports = router;
