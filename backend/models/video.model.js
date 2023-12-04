const db = require('../conf/database');
const VideoModel = {};

VideoModel.getTop10TrendngVideosInCategories = (categories) => {
    const baseQuery = `
        SELECT * FROM Video WHERE categoryID IN (${categories})
        ORDER BY view_count DESC LIMIT 10;
    `;
    return db.execute(baseQuery).then(([results, fields]) => {
        return Promise.resolve(results)
    }).catch((err) => Promise.reject(err));

}

VideoModel.getTop10TrendngVideos = (categories) => {
    const baseQuery = `
        SELECT * FROM Video
        ORDER BY view_count DESC LIMIT 10;
    `;
    return db.execute(baseQuery).then(([results, fields]) => {
        return Promise.resolve(results)
    }).catch((err) => Promise.reject(err));

}

VideoModel.countVideoByTimeStamp = (start, end) => {
    // const baseQuery = `
    //     SELECT published_at, count(*) as count FROM Video WHERE published_at BETWEEN '${start}' AND '${end}'
    //     GROUP BY published_at
    //     ORDER BY published_at
    //     ;
    // `;
    const baseQuery = `
        CALL GetVideoCountByPublishedDate('${start}', '${end}');
    `;
    return db.execute(baseQuery).then(([results, fields]) => {
        return Promise.resolve(results)
    }).catch((err) => Promise.reject(err));

}

VideoModel.createVideo = (video) => {
    const baseQuery = `
        INSERT INTO Video (videoID, channelID, categoryID, dislikes, likes, description, tags, trending_date, title, comment_count, view_count, published_at, region)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    return db.execute(baseQuery, [
        video.videoID,
        video.channelID,
        video.categoryID,
        video.dislikes,
        video.likes,
        video.description,
        video.tags,
        video.trending_date,
        video.title,
        video.comment_count,
        video.view_count,
        video.published_at,
        video.region
    ]).then(([results, fields]) => {
        return Promise.resolve(results && results.affectedRows);
    }).catch((err) => Promise.reject(err));
}

VideoModel.getVideoByTitle = (title) => {
    console.log(title);
    const baseQuery = `
        SELECT * FROM Video WHERE title LIKE '%${title}%';
    `;
    return db.execute(baseQuery).then(([results, fields]) => {
        return Promise.resolve(results)
    }).catch((err) => Promise.reject(err));
}

VideoModel.updateVideo = (videoID, title) => {
    const baseQuery = `
        UPDATE Video SET title = ?
        WHERE videoID = ?;
    `;
    return db.execute(baseQuery, [
        title,
        videoID
    ]).then(([results, fields]) => {
        return Promise.resolve(results && results.affectedRows);
    }).catch((err) => Promise.reject(err));
}

VideoModel.deleteVideo = (videoID) => { 
    console.log(videoID);
    const baseQuery = `
        DELETE FROM Video WHERE videoID = "${videoID}";
    `;
    return db.execute(baseQuery).then(([results, fields]) => {
        return Promise.resolve(results)
    }).catch((err) => Promise.reject(err));

}

module.exports = VideoModel;