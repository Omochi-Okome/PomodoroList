const mongodb = require('mongodb');
const  getDb = require('../util/database').getDb;

class homeItem {
  constructor({_id, item, registerDate, pomodoroCount}) {
    this._id = _id;
    this.item = item;
    this.registerDate = registerDate;
    this.pomodoroCount = pomodoroCount;
  }

  saveProducts() {
    const db = getDb();
    return db
      .collection('list')
      .insertOne({
        _id:new mongodb.ObjectId(),
        item: this.item,
        registerDate: this.registerDate,
        pomodoroCount: this.pomodoroCount 
      });
  }
  
  static fetchAll(){
    const db = getDb();
    return db
      .collection('list')
      .find()
      .toArray()
      .then(products => {
        return products.map(product => new homeItem(product));
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
};
//////////////////////////////////////////////////////////////
class removeItem {
  constructor(_id, itemDelete, deadline) {
    this._id =_id; //_idはobjectId化済み
    this.itemDelete = itemDelete;
    this.deadline = deadline
  }

  saveArchive(){
    const db = getDb();
    return db
      .collection('archive')
      .insertOne({_id:this._id,itemDelete:this.itemDelete, deadline:this.deadline})
  }
  fetchAll(){
    const db = getDb();
    return db
      .collection('archive')
      .find()
      .toArray()
      .then(collectionName => {
        return collectionName.map(item => new removeItem(item._id,item.itemDelete,item.deadline));
      })
      .catch(err => {
        console.log('Error fetching archive data:', err);
        throw err;
      });
  }

  static deleteById(_id) {
    const db = getDb();
    return db
      .collection('list')
      .deleteOne({_id:_id})
      .then(() => {})
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
      const db = getDb();
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

class editText {
  constructor(editedText,originalText,_id) {
    this.editedText = editedText;
    this.originalText = originalText;
    this._id = _id ? new mongodb.ObjectId(_id) : undefined;
  }
  updateItem() {
    const db = getDb();
    console.log(this._id);
    return db
      .collection('list')
      .findOneAndUpdate(
        {_id: new mongodb.ObjectId(this._id)},
        {$set: {item: this.editedText}},
        { returnDocument: 'after'}
      )
  }
  static deleteById(originalText) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({postItem:originalText})
  }
}

module.exports = { homeItem, removeItem,countUpPomodoro, editText};