const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
// const Blacklist = require('../models/Blacklist');
const { SECRET_ACCESS_TOKEN } = require("../config/index")

async function Verify(req, res, next) {
    try {

        const authHeader = req.headers["cookie"];   // get the session cookie from request header

        if (!authHeader) res.sendStatus(401);    // if there is no cookie from requr=est header

        const cookie = authHeader.split("=")[1];    // If there is, split the cookie string to get the actual jwt

        if (!cookie) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Split the cookie to get the JWT token
        const accessToken = cookie.split(";")[0];

        // Blacklist --Logout
        // const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
        // // if true, send an unathorized message, asking for a re-authentication.
        // if (checkIfBlacklisted)
        //     return res
        //         .status(401)
        //         .json({ message: "This session has expired. Please login" });


        // Verify using jwt to see if token has been tampered with or if it has expired.
        jwt.verify(accessToken, SECRET_ACCESS_TOKEN, async (err, decoded) => {
            if (err) {

                console.log(err);
                // if token has been altered or has expired, return an unauthorized error
                return res
                    .status(401)
                    .json({ message: "This session has expired. Please login" });
            }

            const { id } = decoded; // get user id from the decoded token
            const user = await User.findById(id); // find user by that `id`

            if (!user) {
                return res.status(401).json({ message: "Unauthorized: User not found" });
            }

            req.userId = id; // Pass the user ID to the request object

            // const { password, ...data } = user._doc; // return user object without the password
            // req.user = data; // put the data object into req.user

            next();
        });
    } catch (err) {
        console.log("Verify error: ", err);

        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

// admin route
function VerifyRole(req, res, next) {
    try {

        const user = req.user; // we have access to the user object from the request

        const { role } = user; // extract the user role
        // check if user has no advance privileges
        // return an unathorized response
        if (role !== "0x88") {
            return res.status(401).json({
                status: "failed",
                message: "You are not authorized to view this page.",
            });
        }
        next(); // continue to the next middleware or function
    } catch (err) {
        console.log("Verify Role: ", err);

        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

module.exports = { Verify, VerifyRole };