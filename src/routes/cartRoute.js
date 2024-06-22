const express = require('express');
const { addToCart } = require('../controller/cartController');
const router = express.Router();

// Add to Cart Route
router.post('/add-to-cart', addToCart);

module.exports = router;
