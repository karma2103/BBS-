const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema({
  producerName: {
    type: String,
    required: true
  },
  programTitle: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  bookingDate: {
    type: Date,
    required: true
  },
  setupDate: {
    type: Date,
    required: true
  },
  setupTime: {
    type: Date,
    required: true
  },
  venue: {
    type: String,
    required: true
  }
})

const booking = mongoose.model("booking", BookingSchema)

module.exports = booking
