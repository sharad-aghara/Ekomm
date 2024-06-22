const User = require('../models/userModel');
const Product = require('../models/productModel');


// add product to cart
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {

        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the product is already in the cart
        const cartItem = user.cart.find(item => item.product.toString() === productId);
        if (cartItem) {
            // Update the quantity if it exists
            cartItem.quantity += quantity;
        } else {
            // Add new product to the cart
            user.cart.push({ product: productId, quantity });
        }

        await user.save();

        res.status(200).json({ message: 'Product added to cart successfully', cart: user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// get items from cart
const getCartItems = async (req, res) => {
    // const { userId } = req.params;

    try {
        const userId = req.userId;
        
        const user = await User.findById(userId).populate('cart.product');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ cart: user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addToCart, getCartItems };