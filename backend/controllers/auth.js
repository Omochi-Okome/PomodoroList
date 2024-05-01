const {loginUser,SignupUser} = require('../models/user');
const jwt = require('jsonwebtoken')

exports.checkInformation = (req,res) => {
  const emailUsername = req.body.emailUsername;
  const password = req.body.password;
  console.log("emailUsername:",emailUsername)
  const product = new loginUser(emailUsername,password)
  product
    .checkDB()
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: 'セッション保存時にエラーが発生しました。' });
        } else {
          const token = jwt.sign(
            { userId: user._id, emailUsername: user.emailUsername },
            'YOUR_SECRET_KEY',
            { expiresIn: '1h' }
          );
          res.status(200).json({ token: token, userId: user._id });
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.status(401).json({ error: err.message });
    });
}

exports.getLoginForm = (req,res) => {
    res.status(200).send('Login form page.');
}

exports.postSignup = (req,res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    console.log('username:',username)
    const product = new SignupUser(email,username,password);
    product.Signup()
        .then(() => {
          console.log("サインアップに成功しました")
          res.status(200).json({ success: true, message: 'Signup successful!' });
        })
        .catch((err) => console.log(err));
}

exports.postLogout = (req,res) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
}