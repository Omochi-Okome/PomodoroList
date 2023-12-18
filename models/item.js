//以下危険コード.慎重に合流させよ

const fs = require('fs');
const path = require('path');

const DP = path.join(
  path.dirname(require.main.filename),
  'data.json',
);

const AP = path.join(
  path.dirname(require.main.filename),
  'archive.json'
)

module.exports = class Product {
  constructor(postItem, itemDlete) {
    this.postItem = postItem;
    this.itemDlete = itemDlete;
  }

  //homeでのタスク保存
  home_save(){
    const postItem = this.postItem;
    try {
        const data = fs.readFileSync(DP,"utf8");
        let existingData = JSON.parse(data);
        existingData.push(postItem);
        const newData = JSON.stringify(existingData);
        fs.writeFileSync(DP,newData);
    } catch(err) {
        console.log(err);
    }
  }
  //homeからarchiveへ移動
  home_delete(){
    const itemDlete = this.itemDlete;
    try {
      
    } catch(err) {

    }
  }

};
