const videoController = require('../controllers/video.controller');
const express = require('express');
const router = express.Router();

router.route('/')
    .get(videoController.getVideoByTitle);

router.route('/:id')
    .delete(videoController.deleteVideo);

router.route('/top_trending')
    .post(videoController.getTop10TrendngVideosInCategories);

router.route('/top_trending_all')
    .get(videoController.getTop10TrendngVideos);

module.exports = router;