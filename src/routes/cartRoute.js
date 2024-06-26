const express = require('express');
const { addToCart, getCartItems, removeFromCart } = require('../controller/cartController');
const router = express.Router();
const {Verify, VerifyRole} = require('../middleware/verify');

// Add to Cart Route
router.post('/add-to-cart', Verify, addToCart);

// Get from Cart Route
router.get('/:userId', Verify, getCartItems);

// Remove from Cart Route
router.post('/remove-from-cart', Verify, removeFromCart);

module.exports = router;
