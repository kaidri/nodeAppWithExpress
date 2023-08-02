const express = require('express');

// Route handler functions -MIDDLEWARE-
const getAllMovies = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt: req.requestedAt,
        count: movies.length,
        data: {
            movies: movies
        }
    });
}

const getMovieById = (req, res) => {
    console.log(req.params);
    // CONVERT ID TO NUMBER TYPE
    const id = +req.params.id;

    // FIND MOVIE BASED ON ID PARAMETER
    let movie = movies.find(el => el.id === id);

    // IF movie IS FALSEY, RETURN FAILED STATUS - undefined is falsey.
    if(!movie){
        return res.status(404).json({
            status: 'failed',
            message: 'Movie with ID ' +id+ ' is not found.'
        });
    }

    // SEND MOVIE IN THE RESPONSE
    res.status(200).json({
        status: "success",
        data: {
            movie: movie
        }
    });
}

const createNewMovie = (req, res) => {
    //console.log(req.body);
    const newId = movies[movies.length - 1].id + 1;
    const newMovie = Object.assign({id: newId}, req.body)

    movies.push(newMovie);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(201).json({
            status: "success",
            data: {
                movie: newMovie
            }
        })
    });
    //res.send('Created');
}

const updateMovieById = (req, res) => {
    // Convert string from req.params.id to int.
    const id = +req.params.id;
    // Loop through movies object to find id of movie chosen
    const movieToUpdate = movies.find(el => el.id === id);

    // If can't be found (returns undefined) catch error and return below.
    if(!movieToUpdate){
        return res.status(404).json({
            status: 'failed',
            message: 'Movie with ID ' +id+ ' is not found.'
        });
    }

    const index = movies.indexOf(movieToUpdate);

    Object.assign(movieToUpdate, req.body)

    movies[index] = movieToUpdate;

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(200).json({
            status: "success",
            data: {
                movie: movieToUpdate
            }
        })
    });
}

const deleteMovieById = (req, res) => {
    const id = +req.params.id;
    const movieToDelete = movies.find(el => el.id === id);

    if(!movieToDelete){
        return res.status(404).json({
            status: 'failed',
            message: 'Movie with ID ' +id+ ' is not found.'
        });
    }

    const index = movies.indexOf(movieToDelete);

    movies.splice(index, 1);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(204).json({
            status: "success",
            data: {
                movie: null
            }
        })
    });
}

const router = express.Router();

router.route('/')
    .get(getAllMovies)
    .post(createNewMovie)

router.route('/:id')
    .get(getMovieById)
    .patch(updateMovieById)
    .delete(deleteMovieById)

module.exports = router;