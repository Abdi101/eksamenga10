const express = require('express');
const router = express.Router();
// Import Coffee Controller
const {
  // createCoffeeBean,
  getAllCoffeeBeans,
  // getCoffeeBeanById,
  // updateCoffeeBeanById,
  // deleteCoffeeBeanById,
  // populateDatabase
} = require('../controllers/coffeeBeanController');

// import helper functions
// const {validateRequestBody} = require('../helpers/validation');
const {authorizeUser} = require('../helpers/webToken');
// import validation schemas
// const {coffeeBean,updateCoffeeBean} = require('../helpers/schemas/coffeeBean');

router.get('/', getAllCoffeeBeans);
// router.post('/', [authorizeUser, validateRequestBody(coffeeBean), createCoffeeBean]);
// router.get('/:id', getCoffeeBeanById);
// router.patch('/:id', [authorizeUser, validateRequestBody(updateCoffeeBean), updateCoffeeBeanById]);
// router.delete('/:id', [authorizeUser, deleteCoffeeBeanById]);
// router.post('/populate', populateDatabase);

module.exports = router;