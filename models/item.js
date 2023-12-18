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
  constructor(postItem, itemDelete) {
    this.postItem = postItem;
    this.itemDelete = itemDelete;
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
    const itemDelete = this.itemDelete;
    console.log(itemDelete);
    try {
      const readingDataJSON = JSON.parse(fs.readFileSync(DP,"utf8"));
      const readingArchiveJSON = JSON.parse(fs.readFileSync(AP,"utf8"));
      const index = readingDataJSON.findIndex(itemDelete => JSON.stringify(itemDelete) === JSON.stringify(itemDelete));
      const addArchive = readingDataJSON[index];
      console.log(itemDelete);
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

};
