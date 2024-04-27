const {loginUser} = require("../models/user");
const bcrpt = require("bcryptjs");

exports.checkInformation = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const product = new loginUser(email,password)
    console.log(email,password)
    product
        .checkDB()
        .then(user => {
            const token = jwt.sign(
                { userId: user._id, email: user.email },
                'YOUR_SECRET_KEY',
                { expiresIn: '1h' }
            );
            res.status(200).json({ token: token, userId: user._id });
            res.redirect("/");
        })
        .catch(err => {
            res.status(401).json({ error: err.message });
        });
}