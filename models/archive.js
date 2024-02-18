const  getDb = require('../util/database').getDb;
const { ObjectId } = require('mongodb');

class archive {
    constructor(_id,archiveDelete) {
      this._id = _id;
      this.archiveDelete = archiveDelete;
    }
  
    static deleteById(_id) {
      const db = getDb();
      return db
        .collection('archive')
        .deleteOne({_id: new ObjectId(_id)})
        .then(() => {})
        .catch(err => {
          console.log(err);
        });
    }
  }
  
  class returnHome {
    constructor(_id,returnArchive) {
      this._id = _id;
      this.returnHomeItem = returnArchive;
    }
    saveProducts() {
      const db = getDb();
      return db
        .collection('list')
        .insertOne({
          _id:new ObjectId(this._id),
          item: this.returnHomeItem
        });
      } 
  }
  

module.exports = {archive, returnHome};