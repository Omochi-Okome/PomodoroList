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
          throw new Error("ユーザーが見つかりません。");
        }
        return bcrypt.compare(this.password, user.password)
          .then(match => {
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

class SignupUser {
  constructor(email,password) {
    this.email = email
    this.password = password
  }

  Signup() {
    const DB = getDB();
    return DB
      .collection("users")
      .findOne({email: this.email})
      .then((result) => {
        if (result) {
          console.log("すでに登録されています")
          throw new Error("このメールアドレスはすでに登録されています。")
        }
        return bcrypt.hash(this.password, 10)
          .then(hashedPassword => {
            DB
              .collection("users")
              .insertOne({email: this.email, password: hashedPassword})
          })
          .then(signUpresult => {
            console.log("ユーザー登録が完了しました")
            return signUpresult
          })
          .catch(err => console.log("Signupでエラー発生:",err))
      })     
  }
}

module.exports ={loginUser, SignupUser};