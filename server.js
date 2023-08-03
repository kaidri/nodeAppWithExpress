const app = require('./app');

// CREATE A SERVER
const port = 3001;

app.listen(port, () => {
    console.log('Server has started.');
});