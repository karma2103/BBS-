const express = require('express');
const flash = require("express-flash");

const transmissionSchema = require('../model/transmission');
const authController = require('./authController');

const app = express.Router();

app.get("/transmission", authController, function (req, res) {
    res.render('./maintenance/transmission/transmission.ejs',  { user : req.user})
})
app.post("/CreateTransmission", async (req, res) => {
  try {
    const data = new transmissionSchema({
      todaysEvent: req.body.todaysEvent,
      workDone: req.body.workDone,
      specialComment: req.body.specialComment,
      tv : req.body.tv,
      FMandSW : req.body.FMandSW,
      GPSReading : req.body.GPSReading,

    });
    const trans = await data.save();
    // req.flash("success", "Booking Studio successfully");
    res.redirect("/");
  } catch (error) {
    console.error("Error in Power report:", error);
    res.status(500).json({ error: "An error occurred while creating a Power Work." })
  }
})
// view booking
app.get('/viewTransmissionReport', authController, async (req, res) => {
  try {
      const transm = await transmissionSchema.find(); // Fetch all bookings from the database
      res.render('./maintenance/transmission/viewTransmission.ejs', { transm, user : req.user });
  } catch (error) {
      console.error("Error fetching Power Reports:", error);
      res.status(500).send("An error occurred while fetching Power Reports.");
  }
});
module.exports = app;