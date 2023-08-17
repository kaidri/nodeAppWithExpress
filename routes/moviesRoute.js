const express = require('express');
const moviesController = require('./../Controllers/moviesController');

const router = express.Router();

router.route('/highest-rated')
    .get(moviesController.getHighestRated, moviesController.getAllMovies);

router.route('/movie-stats').get(moviesController.getMovieStats);

router.route('/movie-by-genre/:genre').get(moviesController.getMovieByGenre);

// Will trigger if id is present in the route.
router.route('/')
    .get(moviesController.getAllMovies)
    .post(moviesController.createNewMovie)

router.route('/:id')
    .get(moviesController.getMovieById)
    .patch(moviesController.updateMovieById)
    .delete(moviesController.deleteMovieById)

module.exports = router;