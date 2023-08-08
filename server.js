const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

// $env:NODE_ENV="development" - replace NODE_ENV with anything else to set environmental variables
console.log(process.env);

// CREATE A SERVER
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('Server has started.');
});