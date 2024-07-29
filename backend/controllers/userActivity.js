const connectDB = require('../util/database');
const userActivity = require('../models/userActivity');

exports.getData = async (req, res) => {
  const userId = req.query.userId;
  try {
    await connectDB();
    const userInformation = await userActivity.find({userId});
    res.json(userInformation);
  } catch(err) {
    console.error(err);
  }
}

//実装済み
exports.postSignUpData = async (req, res) => {
  const userId = req.user.uid;
  const saveFirstData = new userActivity({userId});
  try {
    await connectDB();
    await saveFirstData.save();
    res.json();
  } catch(err) {
    console.log(err);
  }
}

//実装済み
exports.postLoginData = async (req, res) => {
  const userId = req.user.uid;
  try {
    await connectDB();
    await userActivity.updateOne(
      {userId: userId },
      {$inc: { loginCount: 1 } }
    );
    res.json();
  } catch(err) {
    console.error(err);
  }
}

//実装済み
exports.postAddTodoData = async (req, res) => {
  const userId = req.user.uid;
  try {
    await connectDB();
    await userActivity.updateOne(
      {userId: userId},
      {$inc: {addCount: 1}}
    );
    res.json();
  } catch(err) {
    console.error(err);
  }
}

//実装済み
exports.postCompleteTodoData = async (req, res) => {
  const userId = req.user.uid;
  try {
    await connectDB();
    await userActivity.updateOne(
      {userId: userId},
      {$inc: { finishCount: 1}}
    );
    res.json();
  } catch(err) {
    console.error(err);
  }
}

exports.postCompletePomodoroData = async (req, res) => {
  const userId = req.user.uid;
  try {
    await connectDB();
    await userActivity.updateOne(
      {userId: userId},
      {$inc: { completePomodoros: 1}}
    );
    res.json();
  } catch(err) {
    console.error(err);
  }
}