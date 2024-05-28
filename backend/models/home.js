const getDB = require('../util/database').getDB;

class countUpPomodoro {
  constructor(_id){
    this._id = _id
  }

  countUpPomodoroCount(){
    const db = getDB();
    return db
      .collection('list')
      .updateOne(
        {_id: this._id},
        {$inc: {pomodoroCount:1}},
        {returnDocument:'after'}
      )
      .then(result => {
        console.log(result)
      })
      .catch(err => console.log(err))
  }
}


module.exports = {countUpPomodoro};