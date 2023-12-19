//以下危険コード.慎重に合流させよ

const fs = require('fs');
const path = require('path');
const mongodb = require('mongodb');
const  getDb = require('../util/database').getDb;

const DP = path.join(
  path.dirname(require.main.filename),
  'data.json',
);

const AP = path.join(
  path.dirname(require.main.filename),
  'archive.json'
)

/////////////////////////////////////
class Product {
  constructor({postItem,_id}) {
    this.postItem = postItem;
    this._id = _id;
  }

  //homeでのタスク保存
  home_save() {
    const db = getDb();
    if (this._id) {
      // 更新
      return db.collection('products')
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { postItem: this.postItem } })
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // 挿入
      return db.collection('products')
        .insertOne({ postItem: this.postItem })
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  
  
  static fetchAll() {
    const db = getDb();
    return db.collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products.map(product => new Product(product));
      })
      .catch(err => {
        console.log(err);
      });
  }

};
//////////////////////////////////////////////////////////////
class ss {
  constructor(itemDelete,_id) {
    this.itemDelete = itemDelete;
    this._id =_id;
  }

  home_delete(){
    const db = getDb();
    if (this._id) {
      // 更新
      return db.collection('archive')
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, {itemDelete: itemDelete })
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // 挿入
      return db.collection('archive')
        .insertOne( this.itemDelete)
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  static fetchAll() {
    const db = getDb();
    return db.collection('archive')
      .find()
      .toArray()
      .then(archive => {
        console.log('Fetched archive data:', archive);
        return archive.map(item => new ss(item.itemDelete, item._id)); // ネストから解放
      })
      .catch(err => {
        console.log('Error fetching archive data:', err);
      });
  }
  static deleteById(itemDelete) {
    const db = getDb();
    console.log(this.itemDelete);
    return db
      .collection('products')
      .deleteOne({postItem:itemDelete})
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }
  
}

module.exports = { Product, ss };