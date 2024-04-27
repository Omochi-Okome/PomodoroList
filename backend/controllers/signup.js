const bcrpt = require("bcryptjs");
const {SignupUser} = require("../models/user");

exports.postSignup = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const product = new SignupUser(email,password);
    product.Signup()
        .then(() => {
            res.redirect("/")
        })
        .catch((err) => console.log(err));
}