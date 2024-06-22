const express = require('express');
const { check } = require('express-validator');
const Validate = require('../middleware/validate');
const { Checkout } = require('../controller/checkOutController');

const router = express.Router();

// Checkout route
router.post(
    '/checkout',
    [
        check('userId')
            .not()
            .isEmpty()
            .withMessage('User ID is required'),
        check('name')
            .not()
            .isEmpty()
            .withMessage('Name is required'),
        check('address')
            .not()
            .isEmpty()
            .withMessage('Address is required'),
        check('cardNumber')
            .not()
            .isEmpty()
            .withMessage('Card number is required'),
        check('expirationDate')
            .not()
            .isEmpty()
            .withMessage('Expiration date is required'),
        check('cvv')
            .not()
            .isEmpty()
            .withMessage('CVV is required')
    ],
    Validate,
    Checkout
);

module.exports = router;
