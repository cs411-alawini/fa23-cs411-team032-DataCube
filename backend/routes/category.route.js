const categoryController = require('../controllers/category.controller');
const express = require('express');
const router = express.Router();

router.route('/')
    .get(categoryController.getCategory);

module.exports = router;