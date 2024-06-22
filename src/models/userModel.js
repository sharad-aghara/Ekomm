const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {SECRET_ACCESS_TOKEN} = require('../config/index');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: "Your username is required",
        max: 25,
    },
    email: {
        type: String,
        required: "Your email is required",
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: "Your password is required",
        select: false,
        max: 25,
    },
    role: {
        type: String,
        required: true,
        default: "0x01",
    },
    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        quantity: {
            type: Number,
            default: 1,
        },
    }],
    checkout: {
        name: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        paymentInfo: {
            cardNumber: {
                type: String,
                required: false,
            },
            expirationDate: {
                type: String,
                required: false,
            },
            cvv: {
                type: String,
                required: false,
            },
        },
    },
},
    { timestamps: true }
);


// generate jwt token function (generateAccessJWT())
userSchema.methods.generateAccessJWT = function () {
    let payload = {
        id: this._id,
    };

    return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
        expiresIn: '1m',
    });
};


// pre hook function
userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});


module.exports = mongoose.model("users", userSchema);
