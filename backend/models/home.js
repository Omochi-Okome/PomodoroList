const mongodb = require('mongodb');
const  getDB = require('../util/database').getDB;
const ObjectId  = require('mongodb').ObjectId

class savingTodoList {
  constructor({item, registerDate, pomodoroCount}) {
    this.item = item;
    this.registerDate = registerDate;
    this.pomodoroCount = pomodoroCount;
  }

  saveTodoItem() {
    const db = getDB();
    return db
      .collection('list')
      .insertOne({
        _id:new mongodb.ObjectId(),
        item: this.item,
        registerDate: this.registerDate,
        pomodoroCount: this.pomodoroCount
      });
  }
};

class HomeArchiveMover {
  constructor(_id, ArchiveItem, registerDate, pomodoroCount) {
    this._id = _id;
    this.ArchiveItem = ArchiveItem;
    this.registerDate = registerDate;
    this.pomodoroCount = pomodoroCount;
  }

  saveArchive(){
    const db = getDB();
    return db
      .collection('archive')
      .insertOne({ArchiveItem:this.ArchiveItem, registerDate:this.registerDate, pomodoroCount:this.pomodoroCount})
  }

  deleteById() {
    const db = getDB();
    return db
      .collection('list')
      .deleteOne({_id:new ObjectId(this._id)})
      .then(() => {
        console.log('削除完了')
      })
      .catch(err => {
        console.log(err);
      });
  }
}

class countUpPomodoro {
  constructor(_id){
    this._id = _id
  }

  countUpPomodoroCount(){
    const db = getDB();
    return db
      .collection('list')
      .updateOne(
        {_id: this._id},
        {$inc: {pomodoroCount:1}},
        {returnDocument:'after'}
      )
      .then(result => {
        console.log(result)
      })
      .catch(err => console.log(err))
  }
}


module.exports = { savingTodoList, HomeArchiveMover,countUpPomodoro};