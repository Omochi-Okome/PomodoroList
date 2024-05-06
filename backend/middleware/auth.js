module.exports = (req,res, next) => {
  if (!req.session) {
  return res.redirect("./login")
  }
  next();
}