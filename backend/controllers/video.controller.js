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

module.exports = {
    getTop10TrendngVideosInCategories
}