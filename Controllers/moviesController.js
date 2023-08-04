const fs = require('fs');

let movies = JSON.parse(fs.readFileSync('./Data/movies.json'));

exports.checkId = (req, res, next, value) => {
    console.log('Movie ID is '+ value);
    let movie = movies.find(el => el.id === +value);

    // IF movie IS FALSEY, RETURN FAILED STATUS - undefined is falsey.
    if(!movie){
        return res.status(404).json({
            status: 'failed',
            message: 'Movie with ID ' +value+ ' is not found.'
        });
    }
    next();
}

// Route handler functions -MIDDLEWARE-
exports.getAllMovies = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt: req.requestedAt,
        count: movies.length,
        data: {
            movies: movies
        }
    });
}

exports.validateBody = (req, res, next) => {
    if(!req.body.name || !req.body.releaseYear){
        return res.status(400).json({
            status: "fail",
            message: "Not valid movie data"
        });
    }
}

exports.getMovieById = (req, res) => {
    console.log(req.params);
    // CONVERT ID TO NUMBER TYPE
    const id = +req.params.id;

    // FIND MOVIE BASED ON ID PARAMETER
    let movie = movies.find(el => el.id === id);

    // SEND MOVIE IN THE RESPONSE
    res.status(200).json({
        status: "success",
        data: {
            movie: movie
        }
    });
}

exports.createNewMovie = (req, res) => {
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

exports.updateMovieById = (req, res) => {
    // Convert string from req.params.id to int.
    const id = +req.params.id;
    // Loop through movies object to find id of movie chosen
    const movieToUpdate = movies.find(el => el.id === id);
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

exports.deleteMovieById = (req, res) => {
    const id = +req.params.id;
    const movieToDelete = movies.find(el => el.id === id);

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