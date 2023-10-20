const admin = require('../config/firebaseConfig');

const authController = {};
//authentications
authController.verifyToken = async (req, res, next) => {
    const idToken = req.headers.authorization;
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(403).json({ error: 'Unauthorized', message: error.message });
    }
  };
  

authController.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });
    res.status(200).json({ message: 'User registered successfully', data: userRecord.toJSON() });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user', message: error.message });
  }
};

authController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);
    res.status(200).json({ message: 'User logged in successfully', data: user.toJSON() });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in', message: error.message });
  }
};

authController.logout = async (req, res) => {
  // Implement logout logic, if required
};

module.exports = authController;
