const db = require('../conf/database');
const CategoryModel = {};

CategoryModel.getAllCategories = () => {
    const baseQuery = `
        select distinct c.categoryID,  c.categoryName
        from Video v join Category c on v.categoryID = c.categoryID
        order by c.categoryName asc;
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