const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'yourusername',
    password: 'yourpassword',
    database: 'dissertation_db'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Serve static files
app.use(express.static('public'));

// Handle user registration
app.post('/register', (req, res) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        department: req.body.department,
        year: req.body.year,
        level: req.body.level,
        registration_number: req.body.registrationNumber,
        option: req.body.option,
        gender: req.body.gender,
        user_type: req.body.userType
    };

    const sql = 'INSERT INTO users SET ?';
    db.query(sql, user, (err, result) => {
        if (err) {
            res.status(500).send('Database error');
            throw err;
        }
        res.status(200).send('User registered successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
