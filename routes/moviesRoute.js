const express = require('express');
const moviesController = require('./../Controllers/moviesController');

const router = express.Router();

// Will trigger if id is present in the route.
router.route('/')
    .get(moviesController.getAllMovies)
    .post(moviesController.createNewMovie)

router.route('/:id')
    .get(moviesController.getMovieById)
    .patch(moviesController.updateMovieById)
    .delete(moviesController.deleteMovieById)

module.exports = router;