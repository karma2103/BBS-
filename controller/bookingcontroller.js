const express = require('express');
const flash = require("express-flash");

const BookingSchema = require('../model/booking');
const authController = require('./authController');

const app = express.Router();

app.get("/book", authController, (req, res) =>{
  res.render('./booking/booking.ejs', { user: req.user })
})

app.post("/bookingStuido", authController, async (req, res) => {
  try {
    const setupDateTime = new Date(`${req.body.setupDate}T${req.body.setupTime}`);

    const data = new BookingSchema({
      producerName: req.body.producerName,
      programTitle: req.body.programTitle,
      userName: req.body.userName,
      designation: req.body.designation,
      bookingDate: req.body.bookingDate,
      setupDate: req.body.setupDate,
      setupTime: setupDateTime,  
      venue: req.body.venue,
    });
    const booked = await data.save();
    // req.flash("success", "Booking Studio successfully");
    res.redirect("/");
  } catch (error) {
    console.error("Error in booking:", error);
    res.status(500).json({ error: "An error occurred while booking." })
  }
})
//view booking
app.get('/viewBookingStudio', authController, async (req, res) => {
  try {
      const bookings = await BookingSchema.find(); // Fetch all bookings from the database
      res.render('./booking/viewBookingStudio', { bookings, user: req.user });
  } catch (error) {
      console.error("Error fetching bookings:", error); 
      res.status(500).send("An error occurred while fetching bookings.");
  }
});
module.exports = app;