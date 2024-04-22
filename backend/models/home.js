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
  constructor(_id,itemDelete, registerDate) {
    this._id = _id;
    this.itemDelete = itemDelete;
    this.registerDate = registerDate;
  }

  saveArchive(){
    const db = getDB();
    return db
      .collection('archive')
      .insertOne({itemDelete:this.itemDelete, registerDate:this.registerDate})
  }

  deleteById() {
    const db = getDB();
    return db
      .collection('list')
      .deleteOne({_id:new ObjectId(this._id)})
      .then(() => {
        console.log("削除完了")
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
      console.log(this._id)
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