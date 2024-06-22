const Product = require('../models/productModel');

// Get All Products ---Product Sliders
async function getAllProducts(req, res, next) {
    try {
        const products = await Product.find({}, 'prodName prodImage prodPrice'); // Fetch only required fields
        console.log("Product Controller...");
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get Product by ID
async function getProductById(req, res) {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
};