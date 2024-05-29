const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
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

const List = mongoose.model('List', listSchema, 'list');

module.exports = List;