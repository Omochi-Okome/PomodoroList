const {loginUser} = require("../models/user");
const jwt = require("jsonwebtoken")

exports.checkInformation = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const product = new loginUser(email,password)
    console.log(req.session)
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
                        { userId: user._id, email: user.email },
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