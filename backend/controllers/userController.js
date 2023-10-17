const userModel = require('../models/user');

const registerUser = (req, res) => {
  const { name, email, password, contactNumber } = req.body;

  // Validation of data
  if (!name || !email || !password || !contactNumber) {
    return res.status(400).send('Please provide all required details.');
  }

  userModel.createUser(name, email, password, contactNumber)
    .then(() => {
      return res.status(200).send('User registered successfully!');
    })
    .catch((error) => {
      return res.status(500).send('Error registering user: ' + error);
    });
};

module.exports = { registerUser };

