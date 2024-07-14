const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: 'Tanishq21@', // replace with your MySQL password
    database: 'fullstack_db2'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/api/users', (req, res) => {
    const name = req.body.name;
    const sql = 'INSERT INTO users (name) VALUES (?)';
    db.query(sql, [name], (err, result) => {
        if (err) throw err;
        res.send('User added');
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
