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

CategoryModel.getCategoryCount = () => {
    const baseQuery = `
        SELECT Category.categoryName, COUNT(*) AS count
        FROM Video JOIN Category ON Video.categoryID = Category.categoryID
        GROUP BY Category.categoryName;
    `;
    return db.execute(baseQuery).then(([results, fields]) => {
        return Promise.resolve(results)
    }).catch((err) => Promise.reject(err));
}

module.exports  = CategoryModel;