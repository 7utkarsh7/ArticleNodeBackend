const express = require('express');
const UserController = require('../controllers/userController');
const { authenticateToken } = require('../utils/authMiddleware');
const router = express.Router();

const userController = new UserController();

router.post('/signup', userController.signup.bind(userController));
router.post('/login', userController.login.bind(userController));
router.patch('/users/:userId',authenticateToken, userController.updateProfile.bind(userController));

module.exports = router;
