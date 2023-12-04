const CategoryModel = require('../models/category.model');
const formatResponse = require('./utils').formatResponse;

const getCategory = async (req, res) => {
    try{
        const categories = await CategoryModel.getAllCategories();
        categories.forEach(element => {
            element.categoryName = element.categoryName.substring(0, element.categoryName.length-1);
        });
        res.status(200).send(formatResponse("Successfully get all categories", categories));
    }
    catch(error){
        res.status(404).send(formatResponse("Failed to get all categories", error));
    }
}

const getCategoryCount = async (req, res) => {
    try{
        const count = await CategoryModel.getCategoryCount();
        // preprocess count data
        temp = []
        count.forEach(element => {

            temp.push([ element.categoryName.substring(0, element.categoryName.length-1), element.count])
        });
        res.status(200).send(formatResponse("Successfully get the category count", temp));
    }
    catch(error){
        res.status(404).send(formatResponse("Failed to get the category count", error));
    }
}

module.exports = {
    getCategory,
    getCategoryCount
}
