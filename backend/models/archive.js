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
  constructor(returnItem, registerDate, pomodoroCount){
    this.returnItem = returnItem;
    this.registerDate = registerDate;
    this.pomodoroCount = pomodoroCount
  }
  returnArchiveItem() {
    const db = getDB();
    return db
      .collection("list")
      .insertOne({
        item: this.returnItem,
        registerDate: this.registerDate,
        pomodoroCount: this.pomodoroCount
      })
  }
  
}

module.exports = { archive, returnArchiveItem};
