const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validations.js');
const User = require('../models/User');
const { AuthController } = require('../Controllers/AuthController.js');

// Routers
router.post('/register', AuthController.UserRegister)

router.post('/login', AuthController.UserLogin)

module.exports = router