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
        .updateOne({ _id: new mongodb.ObjectId(this.id) }, { $set: this })
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // 挿入
      return db.collection('products')
        .insertOne(this)
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

class ss {
  constructor(itemDelete,_id) {
    this.itemDelete = itemDelete;
  }

  home_delete(){

    const itemDelete = this.itemDelete;
    console.log(itemDelete);
    try {
      const readingDataJSON = JSON.parse(fs.readFileSync(DP,"utf8"));
      const readingArchiveJSON = JSON.parse(fs.readFileSync(AP,"utf8"));
      const index = readingDataJSON.indexOf(itemDelete);
      const addArchive = readingDataJSON[index];
      // console.log(index);
      //-1は見つからなかった,その他の数字は見つかった
      if (index !== -1) {
        readingDataJSON.splice(index, 1);
        readingArchiveJSON.push(addArchive);
        fs.writeFileSync(DP,JSON.stringify(readingDataJSON));
        fs.writeFileSync(AP,JSON.stringify(readingArchiveJSON));
      }
    } catch(err) {
      console.log(err);
    }
  }
  static deleteById(itemDelete) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ postItem: itemDelete })
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }
  
}

module.exports = { Product, ss };