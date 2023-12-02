const CategoryModel = require('../models/category.model');
const formatResponse = require('./utils').formatResponse;
const getCategory = async (req, res) => {
    try{
        const categories = await CategoryModel.getAllCategories();
        res.status(200).send(formatResponse("Successfully get all categories", categories));
    }
    catch(error){
        res.status(404).send(formatResponse("Failed to get all categories", error));
    }
}
module.exports = {
    getCategory
}
