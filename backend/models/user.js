const mongodb = require('mongodb');
const  getDB = require('../util/database').getDB;

class loginUser {
    constructor(email,password) {
        this.email = email;
        this.password = password;
    }
    checkDB() {
        console.log(this.email,this.password)
        const DB = getDB();
        return DB
            .collection("users")
            .findOne({email:this.email,password:this.password})
    }
}

module.exports ={loginUser};