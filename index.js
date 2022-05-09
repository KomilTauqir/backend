// Importing modules and declaring variables
import session from 'express-session';
import cors from 'cors';
import cookieSession from 'cookie-session';
import fs from 'fs';
import express from 'express';
const port = process.env.PORT || 5000;

// ES6+ (uses import)
import userController from './src/controller/userController.js';

/*
    ES5 example:
    const userController = require('./src/controller/userController);
*/
import authorController
 from './src/controller/authorController.js';
import bookController from './src/controller/bookController.js';
import changeLogController from "./src/controller/changeLogController.js";
import loggingController from "./src/controller/loggingController.js";
import excursionController from "./src/controller/excursionController.js";
import commentController from "./src/controller/commentController.js";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
const app = express();
// app.use(slowDown);
// Enabling middleware and urlencoded from data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// const methodOverride = require('method-override');



app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})


/* Enable session middleware so that we have a state -- 
Middleware is a little piece of software running in the middle */
app.use(session({

    // \/ Used to generate the cookies
    secret: "secret phrase abc123",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
    //  /\ TRUE if you are using HTTPS, switch during live production
}));

// const speedLimiter = slowDown({
//     windowMs: 1000, // 1 second
//      delayAfter: 10, // allow 1 requests per 1 second, then...
//      delayMs: 500, // begin adding 500ms of delay per request above 1:
//     // request # 101 is delayed by  500ms
//     // request # 102 is delayed by 1000ms
//     // request # 103 is delayed by 1500ms
//     // etc.
//   });

//   app.use(speedLimiter);
const limiter = rateLimit({
    windowMs: 1440 * 60 * 1000, // 24hrs
    max: 1000, // Limit each IP to 1000 requests per window
    standardHeaders: true, // Return rate limit info in the RateLimit- headers
    legacyHeaders: false, // Disable the X-RateLimit- headers
});

// Apply the rate limiting middleware to all requests


const speedLimiter = slowDown({
    windowMs: 1000, // 1 second
    delayAfter: 1, // allow 1 requests per 1 second, then...
    delayMs: 500, // begin adding 500ms of delay per request above 1:
    // request # 101 is delayed by  500ms
    // request # 102 is delayed by 1000ms
    // request # 103 is delayed by 1500ms
    // etc.
});

//  apply to all requests
app.use(speedLimiter);
app.use(limiter);

// Frontend Static Servers
app.use(express.static('public'));

// Linking Controllers to Server

app.use('/api', bookController);

app.use('/api', authorController);

app.use('/api', userController);

app.use('/api', changeLogController);

app.use('/api', loggingController)

app.use('/api', excursionController)

app.use('/api', commentController)

// Starting express index
app.listen(port, () => {
    console.log('Backend is listening on http://localhost:' + port);
});
