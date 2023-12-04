const videoController = require('../controllers/video.controller');
const express = require('express');
const router = express.Router();

router.route('/')
    .get(videoController.getVideoByTitle)
    .post(videoController.createVideo);

router.route('/:id')
    .delete(videoController.deleteVideo);

router.route('/top_trending')
    .post(videoController.getTop10TrendngVideosInCategories);

router.route('/top_trending_all')
    .get(videoController.getTop10TrendngVideos);

router.route('/time_stamp')
    .get(videoController.countVideoByTimeStamp);

module.exports = router;