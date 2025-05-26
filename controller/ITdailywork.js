const express = require('express');
const flash = require("express-flash");

const ITDailyReportSchema = require('../model/ITDailyReport');
const authController = require('./authController');

const app = express.Router();

app.get("/IT", authController, function (req, res) {
    res.render('./maintenance/IT/it.ejs',  { user : req.user})
})
app.post("/ITDailyWork", async (req, res) => {
  try {
    const data = new ITDailyReportSchema({
      todaysEvent: req.body.todaysEvent,
      workDone: req.body.workDone,
      specialComment: req.body.specialComment,
    });
    const IT = await data.save();
    // req.flash("success", "Booking Studio successfully");
    res.redirect("/");
  } catch (error) {
    console.error("Error in IT Daily Work report:", error);
    res.status(500).json({ error: "An error occurred while creating a IT Daily Work." })
  }
})
// view booking
app.get('/viewITDailyReport', authController, async (req, res) => {
  try {
      const ITDaily = await ITDailyReportSchema.find(); // Fetch all bookings from the database
      res.render('./maintenance/IT/viewITDailyReport', { ITDaily, user : req.user });
  } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).send("An error occurred while fetching bookings.");
  }
});
module.exports = app;