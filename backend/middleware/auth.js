const admin = require('firebase-admin');

const authMiddleware = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken){
    //ここでバグっている。
    return res.status(401).send('トークンが無効です');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(401).send('トークンが無効です',err);
  }
};

module.exports = authMiddleware;