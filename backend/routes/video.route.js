const videoController = require('../controllers/video.controller');
const express = require('express');
const router = express.Router();

router.route('/top_trending')
    .post(videoController.getTop10TrendngVideosInCategories);

module.exports = router;