const mongoose = require('mongoose');

const archiveListSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  registerDate: {
    type: String,
    required: true,
  },
  pomodoroCount: {
    type: Number,
    required: true,
  }
})

const ArchiveList = mongoose.model('archiveList', archiveListSchema, 'archive');

module.exports = ArchiveList;