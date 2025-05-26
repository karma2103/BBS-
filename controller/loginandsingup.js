const express = require('express');
const app = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../model/user");

const JWT_SECRET = "31988263428368234";
const NODE_ENV = "production";
// Signup Page
app.get('/signup', (req, res) => {
    res.render('./signup/sin-up.ejs');
});

// Signup API
app.post('/signup', async (req, res) => {
    try {
        const { name, email, departmentName, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ name, email, departmentName, password: hashedPassword });
        await user.save();

        console.log("User registered successfully");
        res.redirect("/login");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login Page
app.get('/login', (req, res) => {
    res.render('./signup/login.ejs');
});

// Sign In API
app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token, { httpOnly: true, secure: NODE_ENV === 'production' }); // Set the token in the cookie

        res.redirect("/"); // Redirect after login
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Logout API
app.post('/logout', (req, res) => {
    res.clearCookie("token"); // Clear the JWT token from cookies
    res.redirect("/")
});
module.exports = app;
