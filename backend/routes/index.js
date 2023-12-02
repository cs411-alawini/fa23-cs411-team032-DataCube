var user = require('../routes/user.route');
var category = require('../routes/category.route');
var video = require('../routes/video.route');

module.exports = function (app, router) {
    app.use('/user', user);
    app.use('/category', category);
    app.use('/video', video);
};
