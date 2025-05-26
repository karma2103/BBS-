const express = require('express');
const flash = require("express-flash");

const powerSchema = require('../model/power');
const authController = require('./authController');

const app = express.Router();

app.get("/power", authController, function (req, res) {
    res.render('./maintenance/power/power.ejs',  { user : req.user})
})
app.post("/CreatePower", async (req, res) => {
  try {
    const data = new powerSchema({
      todaysEvent: req.body.todaysEvent,
      workDone: req.body.workDone,
      specialComment: req.body.specialComment,
      generatorReading : req.body.generatorReading
    });
    const power = await data.save();
    // req.flash("success", "Booking Studio successfully");
    res.redirect("/");
  } catch (error) {
    console.error("Error in Power report:", error);
    res.status(500).json({ error: "An error occurred while creating a Power Work." })
  }
})
// view booking
app.get('/viewPowerReport', authController, async (req, res) => {
  try {
      const pow = await powerSchema.find(); // Fetch all bookings from the database
      res.render('./maintenance/power/viewPower.ejs', { pow, user : req.user });
  } catch (error) {
      console.error("Error fetching Power Reports:", error);
      res.status(500).send("An error occurred while fetching Power Reports.");
  }
});
module.exports = app;