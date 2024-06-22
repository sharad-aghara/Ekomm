const express = require('express');
const Validate = require('../middleware/validate');
const { check } = require('express-validator');
// const { Register, Login, Logout } = require('../controller/');
const { Register, Login } = require('../controller/userAuthController');

const router = express.Router();

// Register route
router.post(
    "/register",
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    check("username")
        .not()
        .isEmpty()
        .withMessage("You username is required")
        .trim()
        .escape(),
    check("password")
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage("Password Must be at least 6 chars long"),
    Validate,
    Register
);

module.exports = router;

// Login route
router.post(
    "/login",
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    check("password").not().isEmpty(),
    Validate,
    Login
);


// Logout route
// router.get('/logout', Logout);