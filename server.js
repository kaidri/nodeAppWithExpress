const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');
const { ServerDescription } = require('mongodb');

dotenv.config({path: './config.env'});

// $env:NODE_ENV="development" - replace NODE_ENV with anything else to set environmental variables
console.log(process.env);

// CREATE A SERVER
mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then((conn) => {
    console.log('Database Connection Successful');
}).catch((error) => {
    console.log('An error has occurred');
})

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is a required field.'],
        unique: true
    },
    description: String,
    duration: {
        type: Number,
        required: [true, 'Duration is a required field.']
    },
    ratings: {
        type: Number,
        default: 1.0
    }
});

const Movie = mongoose.model('Movie', movieSchema);

const testMovie = new Movie({
    name: "Die Hard",
    description: "A festive movie...",
    duration: 139,
    rating: 4.5
})

testMovie.save()
.then(doc => {
    console.log(doc);
})
.catch(err => {
    console.log('An error has occurred: ' + err);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('Server has started.');
});