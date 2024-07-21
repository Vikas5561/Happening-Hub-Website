const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { check, validationResult } = require('express-validator');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// MySQL database connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Middleware function to check if user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.session.loggedin) {
        next();
    } else {
        // Store the original request URL in session to redirect back after login
        req.session.returnTo = req.originalUrl;
        res.redirect('/login'); // Redirect to login page if not logged in
    }
};

// Route to serve the registration form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve the login form
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// User registration endpoint
app.post('/register', [
    check('email').isEmail().normalizeEmail(),
    check('phone').isMobilePhone('any', { strictMode: false }),
    check('name').notEmpty(),
    check('address').notEmpty(),
    check('location').notEmpty(),
    check('date').isISO8601().toDate(),
    check('event').isArray().notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, phone, address, location, date, event, message } = req.body;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Database connection error:', err);
            return res.status(500).json({ error: 'Database connection error' });
        }

        const sql = `INSERT INTO Users (name, email, phone, address, location, date, event, message) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [name, email, phone, address, location, date, JSON.stringify(event), message];

        connection.query(sql, values, (err, result) => {
            connection.release();
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ error: 'Database query error' });
            }

            return res.status(200).json({ message: 'User registered successfully' });
        });
    });
});

// Admin login endpoint
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Database connection error:', err);
            return res.status(500).json({ error: 'Database connection error' });
        }

        const sql = `SELECT * FROM Admin WHERE username = ?`;
        const values = [username];

        connection.query(sql, values, (err, results) => {
            if (err) {
                connection.release();
                console.error('Database query error:', err);
                return res.status(500).json({ error: 'Database query error' });
            }

            if (results.length > 0) {
                const admin = results[0];
                bcrypt.compare(password, admin.password, (bcryptErr, bcryptResult) => {
                    connection.release();
                    if (bcryptErr) {
                        console.error('Bcrypt error:', bcryptErr);
                        return res.status(500).json({ error: 'Bcrypt error' });
                    }

                    if (bcryptResult) {
                        req.session.loggedin = true;
                        req.session.admin = {
                            id: admin.id,
                            username: admin.username
                        };
                        return res.status(200).json({ message: 'Admin authenticated successfully' });
                    } else {
                        return res.status(401).json({ error: 'Invalid credentials' });
                    }
                });
            } else {
                connection.release();
                return res.status(401).json({ error: 'Invalid credentials' });
            }
        });
    });
});

// Logout endpoint
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destroy error:', err);
            return res.status(500).json({ error: 'Session destroy error' });
        }
        res.redirect('/');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
