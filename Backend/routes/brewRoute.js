const express = require('express');
const router = express.Router();
// Import Brew Controller
const {
  createBrew,
  getBrewById,
  getAllBrews,
  updateBrewById,
  deleteBrewById,
  queryTopFiveGrindingLevels,
  voteBrew
}= require('../controllers/brewController');

// import helper functions
const {validateRequestBody} = require('../helpers/validation');
const {verifyToken, verifyTokenAndEmployee} = require('../helpers/webToken');
// import validation schemas
const {brew, updateBrew} = require('../helpers/schemas/brew');

router.get('/', getAllBrews);
router.post('/',[verifyTokenAndEmployee, validateRequestBody(brew), createBrew]);
router.get('/levels?', queryTopFiveGrindingLevels)
router.get('/:id', getBrewById);
router.patch('/:id', [verifyTokenAndEmployee, validateRequestBody(updateBrew), updateBrewById]);
router.patch('/vote/:id', [verifyTokenAndEmployee, voteBrew]);
router.delete('/:id', [verifyTokenAndEmployee, deleteBrewById]);

module.exports = router;

