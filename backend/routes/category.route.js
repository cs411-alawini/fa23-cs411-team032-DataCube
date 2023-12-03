const categoryController = require('../controllers/category.controller');
const express = require('express');
const router = express.Router();

router.route('/')
    .get(categoryController.getCategory);
router.route('/count')
    .get(categoryController.getCategoryCount);

module.exports = router;