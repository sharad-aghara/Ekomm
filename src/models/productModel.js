const mongoose = require('mongoose');

// Define the schema for a product
const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    prodName: {
        type: String,
        required: true
    },
    prodImage: {
        type: String,
        required: true
    },
    prodDesc: {
        type: String,
        required: true
    },
    prodPrice: {
        type: Number,
        required: true
    }
});

// Create the model using the schema
const Product = mongoose.model('Product', productSchema);

// Export the model
module.exports = Product;
