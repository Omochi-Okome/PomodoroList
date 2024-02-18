const mongodb = require('mongodb');
const  getDb = require('../util/database').getDb;
const { ObjectId } = require('mongodb');
/////////////////////////////////////

class CommonDbOperation {
  constructor(collectionName,item,_id){
    this.collectionName = collectionName;
    this.item = item;
    this._id;
  }
  writeDB() {
    const db = getDb();
    const collection = db.collection(this.collectionName);
    if(this._id){
      return collection
        .updateOne({_id: new mongodb.ObjectId(this._id)},{ $set: { postItem: this.postItem } })
        .then(result => {
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      return collection
        .insertOne(this.item)
        .then(result => {
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  fetchAll() {
    const db = getDb();
    return db.collection(this.collectionName)
      .find()
      .toArray()
  }
}

class homeItem {
  constructor({_id, item}) {
    this._id = _id;
    this.item = item;
  }
  //DBのlistへ保存
  saveProducts() {
    const db = getDb();
    return db
      .collection('list')
      .insertOne({
        _id:new mongodb.ObjectId(),
        item: this.item
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
    this._id =_id;
    this.itemDelete = itemDelete;
  }

  saveArchive(){
    const db = getDb();
    return db
      .collection('archive')
      .insertOne({_id:new mongodb.ObjectId(this._id),itemDelete:this.itemDelete})
  }
  fetchAll(){
    const db = getDb();

    return db
      .collection('archive')
      .find()
      .toArray()
      .then(collectionName => {
        // console.log('Fetched archive data:', archive);
        return collectionName.map(item => new removeItem(item._id,item.itemDelete)); // ネストから解放
      })
      .catch(err => {
        console.log('Error fetching archive data:', err);
        throw err;
      });
  }

  static deleteById(itemDelete) {
    const db = getDb();
    return db
      .collection('list')
      .deleteOne({item:itemDelete})
      .then(result => {
        // console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }
  
}

class archive {
  constructor(_id,archiveDelete) {
    this._id = _id;
    this.archiveDelete = archiveDelete;
  }

  static deleteById(_id) {
    const db = getDb();
    console.log('投入するid'+_id)
    return db
      .collection('archive')
      .deleteOne({_id: new ObjectId(_id)})
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }
}

class returnHome {
  constructor(returnArchive,_id) {
    this.returnArchive = returnArchive;
    this._id = _id;
  }
  saveProducts() {
    const operation = new CommonDbOperation('products',{postItem:this.returnArchive},this._id);
    return operation.writeDB();
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

module.exports = { homeItem, removeItem ,archive,returnHome,editText};