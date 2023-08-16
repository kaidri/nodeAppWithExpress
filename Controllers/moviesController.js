const Movie = require('./../Models/movieModel');

// Route handler functions -MIDDLEWARE-
exports.getAllMovies = async (req, res) => {
    try{
        const movies = await Movie.find();

        res.status(200).json({
            status: 'Success',
            length: movies.length,
            data: {
                movies
            }
        });
    }
    catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err.message
        });
    }
}

exports.getMovieById = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);

        res.status(200).json({
            status: 'Success',
            data: {
                movie
            }
        });
    }
    catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err.message
        });
    }
}

exports.createNewMovie = async (req, res) => {
    try{
        const movie = await Movie.create(req.body);

        res.status(201).json({
            status: 'Success',
            data: {
                movie
            }
        });
    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err.message
        });
    }
}

exports.updateMovieById = async (req, res) => {
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        res.status(200).json({
            status: 'Success',
            data: {
                movie: updatedMovie
            }
        });
    }
    catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err.message
        });
    }

}

exports.deleteMovieById = async (req, res) => {
    try{
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'Success',
            data: null
        });
    }
    catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err.message
        });
    }
}