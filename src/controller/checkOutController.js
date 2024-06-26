const User = require('../models/userModel');

// Checkout logic
async function Checkout(req, res) {
    try {
        // const userId = req.userId;

        const { userId } = req.body;
        const { name, address, cardNumber, expirationDate, cvv } = req.body.data;

        // Find the user and update their checkout information
        const user = await User.findById(userId);
        if (!user) {
            // return res.status(404).json({
            //     status: "failed",
            //     message: "User not found",
            // });
            throw Error('user not found');
        }

        // Validate checkout information
        if (!name || !address || !cardNumber || !expirationDate || !cvv) {
            // return res.status(400).json({
            //     status: "failed",
            //     message: "All checkout fields are required",
            // });

            throw Error('all fields are required');
        }

        user.checkout = {
            name,
            address,
            paymentInfo: {
                cardNumber,
                expirationDate,
                cvv,
            },
        };

        await user.save();

        res.status(200).json({
            status: "success",
            message: "Checkout information saved successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
    res.end();
}

module.exports = { Checkout };
