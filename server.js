const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

// $env:NODE_ENV="development" - replace NODE_ENV with anything else to set environmental variables
console.log(process.env);

// CREATE A SERVER
mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then((conn) => {
    console.log('Database Connection Successful')
}).catch((error) => {
    console.log('An error has occurred')
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('Server has started.');
});