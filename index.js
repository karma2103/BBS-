// app.js
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const flash = require("express-flash");
const cookieParser = require('cookie-parser');
const authController = require('./controller/authController');
// set the view engine to ejs
app.set("view engine", "ejs")
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: true }));  // For parsing form data
app.use(express.json());  // For parsing JSON data
app.use(cookieParser());
  // Mongo URI from environment variables
const mongoURI = "mongodb+srv://karmatshew471:karma@cluster0.sgmhr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully.'))
  .catch((err) => console.error('MongoDB connection error:', err));

//booking controller
app.use('/',require('./controller/main'));
app.use('/', require("./controller/bookingcontroller"));
app.use('/', require("./controller/maintenance"));
app.use('/', require("./controller/ITdailywork"));
app.use('/', require("./controller/power"));
app.use('/', require("./controller/MCM"));
app.use('/', require("./controller/transmission"));
app.use('/', require("./controller/studio"));
app.use('/', require("./controller/bookController"));
app.use('/', require("./controller/downloadController"));
app.use('/', require("./controller/reportController"));
app.use('/', require("./controller/loginandsingup"));
// Start server
const PORT = process.env.PORT ||8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
