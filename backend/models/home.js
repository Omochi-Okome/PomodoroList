const mongodb = require('mongodb');
const  getDb = require('../util/database').getDb;

class homeItem {
  constructor({_id, item,deadline}) {
    this._id = _id;
    this.item = item;
    this.deadline = deadline
  }
  //DBのlistへ保存
  saveProducts() {
    const db = getDb();
    return db
      .collection('list')
      .insertOne({
        _id:new mongodb.ObjectId(),
        item: this.item,
        deadline: this.deadline 
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
  constructor(_id,itemDelete) {
    this._id =_id; //_idはobjectId化済み
    this.itemDelete = itemDelete;
  }

  saveArchive(){
    const db = getDb();
    return db
      .collection('archive')
      .insertOne({_id:this._id,itemDelete:this.itemDelete})
  }
  fetchAll(){
    const db = getDb();
    return db
      .collection('archive')
      .find()
      .toArray()
      .then(collectionName => {
        return collectionName.map(item => new removeItem(item._id,item.itemDelete));
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
    // console.log(itemDelete);
    return db
      .collection('products')
      .deleteOne({postItem:originalText})
      .then(result => {
        // console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = { homeItem, removeItem, editText};