const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
// const path = require("path");
const dotenv =  require('dotenv');

// Middleware to parse incoming JSON 
// app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb",  extended: true, parameterLimit: 1000000 }));
 
// config
dotenv.config({path : "./config/config.env"});



// // Route imports
// const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
// const order = require("./routes/orderRoute");
// const payment = require("./routes/paymentRoute");

// // Routes
// app.use('/api/v1', product);
app.use('/api/v1', user);
// app.use('/api/v1', order);
// app.use('/api/v1', payment);

// Error handling middleware
const errorMiddleware = require('./middleware/error');
app.use(errorMiddleware);

module.exports = app;
