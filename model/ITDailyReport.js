const mongoose = require("mongoose")

const ITDailyReportSchema = new mongoose.Schema({
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
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }
})

const ITDailyReport = mongoose.model("ITdailyEvents", ITDailyReportSchema)

module.exports = ITDailyReport;
