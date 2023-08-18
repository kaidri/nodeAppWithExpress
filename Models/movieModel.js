const mongoose = require('mongoose');
const fs = require('fs');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is a required field'],
        unique: true,
        maxlength: [100, 'Movie name must not have more than 100 characters'],
        minlength: [4 , 'Movie name must have at least 4 characters'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is a required field'],
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'Duration is a required field']
    },
    ratings: {
        type: Number,
        validate: {
            validator: function(value){
            return value >= 1 && value <= 10;
            // Will return true or false
        },
        message: "Ratings should be above or equal to 1 and 10 or below"
        },
    },
    totalRating: {
        type: Number
    },
    releaseYear: {
        type: Number,
        required: [true, 'Release year is a required field']
    },
    releaseDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    genres: {
        type: [String],
        required: [true, 'Genre is a required field'],
        /* enum: 
        {
            values: ["Action", "Adventure", "Sci-Fi", "Thriller", "Crime", "Drama", "Comedy", "Romance", "Biography"],
            message: "This genre does not exist."
        } */
    },
    directors: {
        type: [String],
        required: [true, 'Director is a required field']
    },
    coverImage: {
        type: String,
        required: [true, 'Cover image is a required field']
    },
    actors: {
        type: [String],
        required: [true, 'Actors is a required field']
    },
    price: {
        type: Number,
        required: [true, 'Price is a required field']
    },
    createdBy: String
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

movieSchema.virtual('durationInHours').get(function(){
    return this.duration / 60;
});
 // PRE HOOK, happens before it's saved in the database.
movieSchema.pre('save', function(next) {
    this.createdBy = 'Kai';
    next();
});

// POST HOOK, happens after it's been saved in the database.
movieSchema.post('save', function(doc, next){
    const content = `A new movie document with name ${doc.name} has been created by ${doc.createdBy}.\n`;
    fs.writeFileSync('./log/log.txt', content, {flag: 'a'}, (err) => {
        console.log(err.message);
    });
    next();
});

// PRE HOOK, this will happen before the database is queried.
movieSchema.pre(/^find/, function(next){
    // "this" points to current query object.
    this.find({releaseDate: {$lte: Date.now()}});
    this.startTime = Date.now();
    next();
});

movieSchema.post(/^find/, function(docs, next){
    // "this" points to current query object.
    this.find({releaseDate: {$lte: Date.now()}});
    this.endTime = Date.now();

    const content = `Query took ${this.endTime - this.startTime} milliseconds.`
    fs.writeFileSync('./log/log.txt', content, {flag: 'a'}, (err) => {
        console.log(err.message);
    });

    next();
});

// PRE HOOK AGGREGATE
movieSchema.pre('aggregate', function(next){
    console.log(this.pipeline().unshift({ $match: {releaseDate: {$lte: new Date()}}}));
    next();
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;