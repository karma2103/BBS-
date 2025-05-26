const mongoose = require("mongoose")

const maintenanceSchema = new mongoose.Schema({
  todaysEvent: {
    type: String,
    required: true
  },
  regularWork: {
    type: String,
    required: true
  },
  specialComment: {
    type: String,
  },
  morning: {
    type: String,
    required: true
  },
  evening : {
    type : String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }
})

const maintenance = mongoose.model("maintenance", maintenanceSchema)

module.exports = maintenance;
