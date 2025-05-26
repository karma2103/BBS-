const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DownloadSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Dwonload', DownloadSchema);
