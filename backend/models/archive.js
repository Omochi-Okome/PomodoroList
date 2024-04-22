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

module.exports = { archive};
