const {loginUser,SignupUser} = require('../models/user');
const jwt = require('jsonwebtoken')

exports.checkInformation = (req,res) => {
  const emailUsername = req.body.emailUsername;
  const password = req.body.password;
  const product = new loginUser(emailUsername,password)
  product
    .checkDB()
    .then(user => {
      const token = jwt.sign(
        { userEmail: user.email, userName: user.username},
        'your_secret_key',
        {expiresIn: '1h'}
      );
      req.session.save(err => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: 'セッション保存時にエラーが発生しました。' });
        } else {
          return res.status(200).cookie('jwt', token, {
            secure: false,
            domain: 'localhost',
            httpOnly: false,
          }).json(user)
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
    const product = new SignupUser(email,username,password);
    product.Signup()
      .then(() => {
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