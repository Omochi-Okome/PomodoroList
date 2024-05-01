const  getDB = require('../util/database').getDB;
const bcrypt = require('bcrypt');
const dayjs = require('dayjs');

class loginUser {
  constructor(emailUsername,password) {
    this.emailUsername = emailUsername;
    this.password = password;
  }

  checkDB() {
    const DB = getDB();
    return DB
      .collection('users')
      .findOne({
        $or:[
          {email: this.emailUsername},
          {username: this.emailUsername}
        ]
      })
      .then(user => {
        if (!user) {
          throw new Error('ユーザーが見つかりません。');
        }
        return bcrypt.compare(this.password, user.password)
          .then(match => {
            if (match) {                            
              console.log('パスワードが一致しました。');
              return user;
            } else {
              console.log('パスワードが違います。');
              throw new Error('パスワードが違います。');
            }
          });
      })
  }
}

class SignupUser {
  constructor(email,username,password) {
    this.email = email;
    this.username = username;
    this.password = password;
  }

  Signup() {
    const DB = getDB();
    return DB
      .collection('users')
      .findOne(
        {
          $or: [
            {email: this.email},
            {username: this.username}
          ]
        }
      )
      .then((result) => {
        if (result) {
          console.log('すでに登録されています')
          throw new Error('登録したメールアドレスかユーザーネームがすでに登録されています。')
        }
        return bcrypt.hash(this.password, 10)
          .then(hashedPassword => {
            DB
              .collection('users')
              .insertOne(
                {
                  email: this.email,
                  username: this.username,
                  password: hashedPassword,
                  registerDate: dayjs().format('YYYY-MM-DD')
                })
          })
          .then(signUpresult => {
            console.log('ユーザー登録が完了しました')
            return signUpresult
          })
          .catch(err => console.log('Signupでエラー発生:',err))
      })     
  }
}

module.exports ={loginUser, SignupUser};