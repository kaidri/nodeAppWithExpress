// IMPORT PACKAGE
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const moviesRouter = require('./routes/moviesRoute.js');

let app = express();
let movies = JSON.parse(fs.readFileSync('./Data/movies.json'));

// Creating a middleware
// next is a function not a method
const logger = function(req, res, next){
    console.log('Custom middleware called');
    next();
}

// Middleware is called one after the other, if I post logger middleware after app.route for just movies it'll only apply to those for /id middleware.
app.use(express.json());
app.use(morgan('dev'));
app.use(logger);
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
});

// REFACTORED ROUTE HANDLERS
app.use('/api/v1/movies', moviesRouter);

// CREATE A SERVER
const port = 3001
app.listen(port, () => {
    console.log('Server has started.');
});