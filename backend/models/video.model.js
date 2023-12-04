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
    const baseQuery = `
        SELECT published_at, count(*) as count FROM Video WHERE published_at BETWEEN '${start}' AND '${end}'
        GROUP BY published_at
        ORDER BY published_at
        ;
    `;
    return db.execute(baseQuery).then(([results, fields]) => {
        return Promise.resolve(results)
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

VideoModel.deleteVideo = (videoID) => { 
    const baseQuery = `
        DELETE FROM Video WHERE videoID = ${videoID};
    `;
    return db.execute(baseQuery).then(([results, fields]) => {
        return Promise.resolve(results)
    }).catch((err) => Promise.reject(err));

}

module.exports = VideoModel;