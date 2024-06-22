const express = require('express');
const { addToCart, getCartItems } = require('../controller/cartController');
const router = express.Router();

// Add to Cart Route
router.post('/add-to-cart', addToCart);

// Get from Cart Route
router.get('/:userId', getCartItems);

module.exports = router;
