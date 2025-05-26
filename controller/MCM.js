const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { GridFSBucket } = require('mongodb');
// Init app
const app = express();

// EJS view engine
app.set('view engine', 'ejs');

// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Mongo URI
const mongoURI = 'mongodb+srv://karmatshew471:karma@cluster0.lhc0t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Init gfs
let gfsBucket;

conn.once('open', () => {
    // Initialize the GridFSBucket
    gfsBucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
  });

// Storage engine for multer-gridfs

// Init upload middleware
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Load the model
const File = require('../model/MCM');
const authController = require('./authController');

// @route GET /
// @desc Loads form and file list
app.get('/MCM', authController, async (req, res) => {
  try {
    const searchQuery = req.query.search || '';
    const regex = new RegExp(searchQuery, 'i'); 
    // Retrieve all files from the MongoDB database
    const files = await File.find().sort({ date: -1 });
    res.render('./MCM/MCM.ejs', { files, user : req.user });
  } catch (err) {
    res.status(500).send('An error occurred while loading the page');
  }
});

// app.get("/manual", function (req, res) {
//     res.render('./book/books.ejs')
// })

app.get("/uploadsMCM", authController, function(req, res) {
    res.render("./MCM/uploadMCM.ejs",  { user : req.user})
})

// @route POST /upload
// @desc Upload file to DB
app.post('/uploadMCM', upload.single('file'), async (req, res) => {
    try {
      // Use the original filename from the uploaded file
      const filename = req.file.originalname;
      
      // Create an upload stream in GridFSBucket
      const uploadStream = gfsBucket.openUploadStream(filename, {
        contentType: req.file.mimetype
      });
  
      // Write the file buffer to GridFSBucket
      uploadStream.end(req.file.buffer);
  
      // Save file info in MongoDB model
      const newFile = new File({
        title: req.body.title,
        filename: filename,  // Store original filename
        date: new Date(),
      });
  
      await newFile.save();
      res.redirect('/MCM');
    } catch (err) {
      console.error(err);
      res.status(500).send('File upload failed');
    }
  });
  app.get('/files/view/:filename', authController, (req, res) => {
    try {
      const fileStream = gfsBucket.openDownloadStreamByName(req.params.filename);
      fileStream.on('error', (err) => {
        return res.status(404).send('File not found');
      });
      fileStream.pipe(res);  // Stream the file directly to the response
    } catch (err) {
      res.status(500).send('Error viewing file');
    }
  });
  
  // @route GET /files/download/:filename
  // @desc Download the file
  app.get('/files/download/:filename', authController, (req, res) => {
    try {
      const fileStream = gfsBucket.openDownloadStreamByName(req.params.filename);
      res.set('Content-Disposition', `attachment; filename="${req.params.filename}"`);
      fileStream.on('error', (err) => {
        return res.status(404).send('File not found');
      });
      fileStream.pipe(res);  // Pipe the file into the response as a download
    } catch (err) {
      res.status(500).send('Error downloading file');
    }
  });
  


// @route DELETE /files/:id
// @desc Delete a file by ID
app.delete('/files/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).send('File not found');

    await File.deleteOne({ _id: req.params.id });
    gfs.remove({ filename: file.filename, root: 'uploads' }, (err) => {
      if (err) return res.status(500).send('File deletion failed');
      res.redirect('/');
    });
  } catch (err) {
    res.status(500).send('Error occurred during deletion');
  }
});

module.exports = app;