const mongoose = require("mongoose")

const studioSchema = new mongoose.Schema({
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
  AironEquiptment: {
    type: String,
    required: true
  },  
  postProduction: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }
})

const studio = mongoose.model("studio", studioSchema)

module.exports = studio;
