const videoController = require('../controllers/video.controller');
const express = require('express');
const router = express.Router();

router.route('/:title')
    .get(videoController.getVideoByTitle);

router.route('/:id')
    .delete(videoController.deleteVideo);
    
router.route('/top_trending')
    .post(videoController.getTop10TrendngVideosInCategories);

module.exports = router;