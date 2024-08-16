const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware to parse the incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form on a GET request
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/submit-form');
});

// Handle form submission on a POST request
app.post('/submit-form', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    fetch('http://localhost:3002/submit-form')
    .then(response =>{
        document.getElementById(username)
    });

    // Display the entered username and password
    res.send(`Username: ${username}, <br> Password: ${password}`);
});

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'login_page',
    password: 'saima@969',
    port: 3002,
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    pool.query('INSERT INTO login (username, password) VALUES ($1, $2)', [username, password], (error, results) => {
        if (error) {
            throw error;
        }
        console.log('Data inserted successfully!');
        res.send(`Welcome, ${username}!`);
    });
});

// Start the server on the correct port
app.listen(3002, () => {
    console.log(`Server running at http://localhost:3002`);
});
