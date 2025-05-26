const mongoose = require("mongoose")

const powerSchema = new mongoose.Schema({
  todaysEvent: {
    type: String,
    required: true
  },
  workDone: {
    type: String,
    required: true
  },
  specialComment: {
    type: String,
  },
  generatorReading: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }
})

const power = mongoose.model("power", powerSchema)

module.exports = power;
