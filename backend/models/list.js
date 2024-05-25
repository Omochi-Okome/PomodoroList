const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
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

const List = mongoose.model('List', listSchema);

module.exports = List;