const admin = require('../config/firebaseConfig');

const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Unauthorized', message: error.message });
  }
};

module.exports = verifyToken;
