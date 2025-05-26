const mongoose = require("mongoose")

const transmissionSchema = new mongoose.Schema({
  todaysEvent: {
    type: String,
    required: true
  },
  workDone: {
    type: String,
    required: true
  },
  SpecialComment: {
    type: String,
  },
  tv: {
    type: String,
    required: true
  },
  FMandSW : {
    type : String,
    required: true
  },
  GPSReading : {
    type : String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }
})

const transmission = mongoose.model("transmission", transmissionSchema)

module.exports = transmission;
