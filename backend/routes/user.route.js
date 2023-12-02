const userController = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.route('/:id')
    .put(userController.updateUser)

router.route('/login')
    .post(userController.login)

router.route('/register')
    .post(userController.createUser);

// router.route('/:id')
//     .get(userController.getUser)
//     .put(userController.updateUser)
//     .delete(userController.deleteUser);

module.exports = router;
