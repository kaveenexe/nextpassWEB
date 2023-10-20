const { admin, db } = require('../config/firebaseConfig');
const QRCode = require('qrcode');

const authController = {};

authController.register = async (req, res) => {
  const { email, password, startpoint, endpoint, balance } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      startpoint: startpoint,
      endpoint: endpoint,
      balance: balance,
    });

    const userData = {
      email: email,
      password: password,
      startpoint: startpoint,
      endpoint: endpoint,
      balance: balance,
      // Add other user data as needed
    };

    // Save user data to Firestore
    await db.collection('users').doc(userRecord.uid).set(userData);

    // Convert user data to a string
    const stringData = JSON.stringify(userData);

    // Generate QR code
    QRCode.toDataURL(stringData, async (err, qrCode) => {
      if (err) return res.status(500).json({ error: 'Error generating QR code', message: err.message });

      // Save QR code to the user document
      await db.collection('users').doc(userRecord.uid).update({ qrCode: qrCode });

      res.status(200).json({ message: 'User registered successfully and QR code generated', data: userRecord.toJSON() });
    });
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
