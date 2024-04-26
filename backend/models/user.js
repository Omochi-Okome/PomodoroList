const mongodb = require('mongodb');
const  getDB = require('../util/database').getDB;
const bcrypt = require("bcrypt");

class loginUser {
    constructor(email,password) {
        this.email = email;
        this.password = password;
    }

    checkDB() {
        const DB = getDB();
        return DB
            .collection("users")
            .findOne({email: this.email})
            .then(user => {
                if (!user) {
                    console.log("ユーザーが見つかりません");
                    throw new Error("ユーザーが見つかりません。");
                }
                console.log("ユーザーが見つかりました",user.password);
                console.log("user.password:", password);
                console.log("this.password:",this.password)
                return bcrypt.compare(this.password, user.password)
                    .then(match => {
                        console.log("match",match)
                        if (match) {
                            
                            console.log("パスワードが一致しました。");
                            return user;
                        } else {
                            console.log("パスワードが違います。");
                            throw new Error("パスワードが違います。");
                        }
                    });
            })
    }
}

module.exports ={loginUser};