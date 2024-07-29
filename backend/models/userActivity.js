const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
  //ユーザーID
  userId: {
    type: String,
    required: true,
  },
  //ログイン回数
  loginCount: {
    type: Number,
    required: true,
    default: 0
  },
  //ToDo追加回数
  addCount: {
    type: Number,
    required: true,
    default: 0
  },
  //ToDo完了回数
  finishCount: {
    type: Number,
    required: true,
    default: 0
  },
  //ポモドーロ完了回数
  completePomodoros: {
    type: Number,
    required: true,
    default: 0
  }
})

const userActivity = mongoose.model('userActivity', userActivitySchema);

module.exports = userActivity;