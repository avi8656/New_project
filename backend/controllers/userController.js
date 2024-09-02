const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");


// register user
exports.registerUser = catchAsyncError(async (req, res, next) => {
    res.status(201).json({
        success: true,
        message: "User registered successfully"
    });
    // const { name, email, password } = req.body;
    // const user = await User.create({
    //     name, email, password,
    // });
    // sendToken(user, 201, res);

});