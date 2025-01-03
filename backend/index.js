const express = require('express')
const session = require('express-session')
const cors = require('cors')
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const e = require('express');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mega'
});


const sessionStore = new MySQLStore({}, db);

const app = express();

app.use(cors({
    origin: 'http://localhost:5137',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(bodyParser.json());


app.post('/register', async(req,res) => {
    const {username, password} = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username])
        if(rows.length > 0){
            return res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query('INSERT INTO users (username, password) VALUES(?,?)', [username, hashedPassword])
        res.status(201).json({message: 'User registered successfully'})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
})

app.post('/login', async (req,res) => {
    const {username, password} = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username])
        if(rows.length === 0){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const user = rows[0]

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: 'Invalid credentials'})
        }

        req.session.user = { id: user.id, username: user.username};
        res.json({message: 'Login successful'});
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
})


app.post('/logout', (req,res) => {
  req.session.destroy(err => {
    if(err) {
        return res.status(500).json({ message: 'Logout failed'})
    }
    res.clearCookie('session_cookie_name');
    res.json({message: 'Logout successful'})
  });
});


app.get('/protected', (req,res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    res.json({message: `Welcome, ${req.session.user.username}`});
})

app.listen(3000)