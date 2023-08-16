const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Movie = require('./../Models/movieModel');

dotenv.config({path: './config.env'});

// CONNECT TO MONGODB
mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then((conn) => {
    console.log('Database Connection Successful');
}).catch((error) => {
    console.log('An error has occurred');
})

// READ MOVIES.JSON FILE
const movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

// DELETE EXISTING MOVIE DOCUMENTS FROM THE COLELCTION
const deleteMovies = async () => {
    try{
        await Movie.deleteMany();
        console.log('Data successfully deleted.');
    }
    catch(err){
        console.log(err);
    }
    process.exit();
}

const importMovies = async () => {
    try{
        await Movie.create(movies);
        console.log('Data successfully imported.');
    }
    catch(err){
        console.log(err);
    }
    process.exit();
}

if(process.argv[2] === '--import'){
    importMovies();
}
if(process.argv[2] === '--delete'){
    deleteMovies();
}