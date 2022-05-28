const express = require('express');
const router = express.Router();
// import Rating Contoller
const {
    createRating,
    editRating,
    getMyRatings
} = require('../controllers/ratingController');

// import helper functions
const {validateRequestBody} = require('../helpers/validation');
const {verifyToken, verifyTokenAndEmployee} = require('../helpers/webToken');
// import validation schemas
const {rating} = require('../helpers/schemas/rating');

router.patch('/:id',verifyTokenAndEmployee, validateRequestBody(rating), editRating);
router.get('/', verifyTokenAndEmployee, getMyRatings);
router.post('/', verifyTokenAndEmployee, validateRequestBody(rating), createRating);


module.exports = router;