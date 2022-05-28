const express = require('express');
const router = express.Router();
// import User Contoller
const {
    createUser,
    userLogin
} = require('../controllers/userController');

// import helper functions
const {validateRequestBody} = require('../helpers/validation');
const {verifyToken} = require('../helpers/webToken');
// import validation schemas
const {user} = require('../helpers/schemas/user');

router.post('/', validateRequestBody(user), createUser);
router.post('/login', validateRequestBody(user), userLogin);

module.exports = router;