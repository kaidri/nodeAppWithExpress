// IMPORT PACKAGE
const express = require('express');
const morgan = require('morgan');

const moviesRouter = require('./routes/moviesRoute');

let app = express();

// Creating a middleware
// next is a function not a method
const logger = function(req, res, next){
    console.log('Custom middleware called');
    next();
}

// Middleware is called one after the other, if I post logger middleware after app.route for just movies it'll only apply to those for /id middleware.
app.use(express.json());
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(express.static('./public'));
app.use(logger);
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
});

// REFACTORED ROUTE HANDLERS
app.use('/api/v1/movies', moviesRouter);

// No matter the request method (get, post, delete) it'll return a default route with * route being all URL patterns. Should be used last.
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: "failed",
        message: `Can't find ${req.originalUrl} on the server`
    })
});

module.exports = app;