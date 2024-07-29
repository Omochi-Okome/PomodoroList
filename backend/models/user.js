// const getDB = require('../util/database').getDB;
// const bcryptjs = require('bcryptjs');
// const dayjs = require('dayjs');

// class loginUser {
//   constructor(emailUsername,password) {
//     this.emailUsername = emailUsername;
//     this.password = password;
//   }

//   async checkDB() {
//     const DB = getDB();
//     try {
//       const user = await DB.collection('users').findOne({
//         $or:[
//           {email: this.emailUsername},
//           {username: this.emailUsername}
//         ]
//       });

//       if (!user) {
//         throw new Error('ユーザーが見つかりません');
//       }

//       const match = await bcryptjs.compare(this.password, user.password);

//       if (match) {
//         console.log('パスワードが一致しました');
//         return user;
//       } else {
//         console.log('パスワードが違います');
//         throw new Error('パスワードが違います');
//       }
//     } catch(err) {
//       console.error(err);
//     }
//   }
// }

// class SignupUser {
//   constructor(email,username,password) {
//     this.email = email;
//     this.username = username;
//     this.password = password;
//   }

//   async Signup() {
//     const DB = getDB();
//     try{
//       const result = await DB.collection('users').findOne({
//         $or: [
//           {email: this.email},
//           {username: this.username}
//         ]
//       });
//       if (result) {
//         console.log('すでに登録されています')
//         throw new Error('登録したメールアドレスかユーザーネームがすでに登録されています。')
//       }
//       const hashedPassword = await bcryptjs.hash(this.password, 10);
//       const signUpresult = await DB.collection('users').insertOne({
//         email: this.email,
//         username: this.username,
//         password: hashedPassword,
//         registerDate: dayjs().format('YYYY-MM-DD')
//       });
//       console.log('ユーザー登録が完了しました');
//       return signUpresult;
//     } catch(err) {
//       console.error(err);
//       throw err;
//     }
//   }
// }

// module.exports ={loginUser, SignupUser};