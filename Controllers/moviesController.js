const Movie = require('./../Models/movieModel');
const ApiFeatures = require('./../Utils/ApiFeatures');

exports.getHighestRated = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratings'

    next();
}

// Route handler functions -MIDDLEWARE-
exports.getAllMovies = async (req, res) => {
    try{
        const features = new ApiFeatures(Movie.find(), req.query)
                        .sort()
                        .filter()
                        .limitFields()
                        .paginate();
        let movies = await features.query;

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

exports.getMovieStats = async (req, res) => {
    try{
        const stats = await Movie.aggregate([
            { $match: {ratings: {$gte: 7}}},
            { $group: {
                _id: null,
                avgRating: { $avg: '$rating' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
            }}
        ]);

        res.status(200).json({
            status: 'Success',
            count: stats.length,
            data: {
                stats
            }
        });
    }
    catch(err){
        res.status(404).json({
            status: "Failed",
            message: err.message
        })
    }
}