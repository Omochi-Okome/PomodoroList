const getDB = require("../util/database").getDB;

class archive {
  constructor(_id) {
    this._id = _id;
  }

  deleteById() {
    const db = getDB();
    return db
      .collection("archive")
      .deleteOne({ _id: this._id })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }
}

class returnArchiveItem {
  constructor(returnItem){
    this.returnItem = returnItem;
  }
  returnArchiveItem() {
    const db = getDB();
    return db
      .collection("list")
      .insertOne({
        item:this.returnItem
      })
  }
  
}

module.exports = { archive, returnArchiveItem};
