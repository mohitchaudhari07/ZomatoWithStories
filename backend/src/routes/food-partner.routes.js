const express = require('express');
const router = express.Router();
const foodPartnerController = require('../controllers/food-partner.controller');




router.get('/:id', foodPartnerController.getFoodPartnerById);

module.exports = router;