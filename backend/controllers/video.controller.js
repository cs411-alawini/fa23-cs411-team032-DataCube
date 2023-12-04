const videoModel = require('../models/video.model');
const formatResponse = require('./utils').formatResponse;

const getTop10TrendngVideosInCategories = async (req, res) => {
    try{
        const videos = await videoModel.getTop10TrendngVideosInCategories(req.body.categoryIDs);
        res.status(200).send(formatResponse("Successfully get top 10 trending videos in categories", videos));
    }
    catch(error){
        
        res.status(404).send(formatResponse("Failed to get top 10 trending videos in categories", error));
    }
}

const getTop10TrendngVideos = async (req, res) => {
    try{
        const videos = await videoModel.getTop10TrendngVideos();
        res.status(200).send(formatResponse("Successfully get top 10 trending videos", videos));
    }
    catch(error){
        res.status(404).send(formatResponse("Failed to get top 10 trending videos", error));
    }
}

const getVideoByTitle = async (req, res) => {
    try{
        const videos = await videoModel.getVideoByTitle(req.query.title);
        res.status(200).send(formatResponse("Successfully get video by title", videos));
    }
    catch(error){
        res.status(404).send(formatResponse("Failed to get video by title", error));
    }
}

const deleteVideo = async (req, res) => {
    try{
        const videos = await videoModel.deleteVideo(req.body.videoID);
        res.status(200).send(formatResponse("Successfully delete video", videos));
    }
    catch(error){
        res.status(404).send(formatResponse("Failed to delete video", error));
    }
}

module.exports = {
    deleteVideo,
    getVideoByTitle,
    getTop10TrendngVideosInCategories,
    getTop10TrendngVideos
}