const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4001;

// Use body-parser to parse POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Display the login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Handle the login form submission
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Implement your authentication logic here (e.g., check against a database)

    // For demonstration, let's assume a valid username and password
    if (username === 'user' && password === 'password') {
        res.send('Login successful!');
    } else {
        res.send('Login failed. Please try again.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

