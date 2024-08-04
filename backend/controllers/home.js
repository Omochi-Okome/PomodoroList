const connectDB = require('../util/database');
const List = require('../models/list');
const ArchiveList = require('../models/archiveList');

exports.getHome = async (req, res) => {
  const userId = req.user.user_id;
  try {
    await connectDB();
    const products = await List.find({userId});
    res.json(products);
  } catch(err) {
    console.error(err);
  }
};

exports.postItem = async (req, res) => {
  const {userId,inputData: item, registerDate} = req.body;
  const saveTodoItem = new List({userId,item, registerDate});
  try {
    await saveTodoItem.save();
    res.status(200).send();
  } catch(err) {
    console.error(err)
  }
};

exports.deleteItem = async (req, res) => {
  const {userId,itemId, item, registerDate, pomodoroCount} = req.body;
  const saveArchiveItem = new ArchiveList({userId, item, registerDate, pomodoroCount});
  try {
    const savedArchiveItem = await saveArchiveItem.save();
    await List.deleteOne({_id:itemId});
    res.status(200).json(savedArchiveItem);
  } catch(err) {
    console.error(err);
  }
};

exports.countUpPomodoroCount = async(req,res) => {
  const _id = req.body.selectedId;
  try {
    await List.updateOne(
      { _id: _id},
      { $inc: { pomodoroCount: 1}},
    );
    res.status(200).send();
  } catch(err) {
    console.error(err);
  }
}
