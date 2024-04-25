const {loginUser} = require("../models/user");

exports.checkInformation = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const product = new loginUser(email,password)
    console.log(email,password)
    product
        .checkDB()
        .then((result) => {
            if (result) {
                console.log(result)
            } else {
                console.log("存在しない")
            }
        })
}