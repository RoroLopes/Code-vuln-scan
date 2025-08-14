const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
    db.run("INSERT INTO users (username, password) VALUES ('admin', 'password123')");
    db.run("INSERT INTO users (username, password) VALUES ('user', 'userpass')");
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
    db.get(query, (err, row) => {
        if (err) return res.send("Error!");
        if (row) {
            res.send(`Welcome, ${row.username}!`);
        } else {
            res.send("Invalid credentials.");
        }
    });
});


app.get('/greet', (req, res) => {
    const name = req.query.name || "Guest";
    res.send(`<h1>Hello, ${name}!</h1>`);
});

app.listen(port, () => {
    console.log(`Vulnerable app running on http://localhost:${port}`);
});
