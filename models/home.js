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

class Product {
  constructor(postItem) {
    this.postItem = postItem;
  }

  //homeでのタスク保存
  home_save(){
    const postItem = this.postItem;
    console.log(postItem);
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

};

class ss {
  constructor(itemDelete) {
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
}

module.exports = { Product, ss };