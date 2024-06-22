const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controller/productController');

// Products
router.get('/', getAllProducts);

// GET product by ID
router.get('/:id', getProductById);

module.exports = router;