module.exports = (req,res, next) => {
    console.log("Session status: ", req.session);
    if (!req.session) {
        return res.redirect("./login")
    }
    next();
}