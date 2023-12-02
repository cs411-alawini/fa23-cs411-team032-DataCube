const db = require('../conf/database');
const CategoryModel = {};

CategoryModel.getAllCategories = () => {
    const baseQuery = `
        SELECT * FROM Category;
    `;
    return db.execute(baseQuery).then(([results, fields]) => {
        return Promise.resolve(results)
    }).catch((err) => Promise.reject(err));
};

module.exports  = CategoryModel;