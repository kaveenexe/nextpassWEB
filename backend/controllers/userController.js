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

//get user
const getUserByEmail = (req, res) => {
  const { email } = req.params;

  userModel.getUserByEmail(email)
    .then((userData) => {
      if (userData) {
        return res.status(200).json(userData);
      } else {
        return res.status(404).send('User not found.');
      }
    })
    .catch((error) => {
      return res.status(500).send('Error retrieving user: ' + error);
    });
};

module.exports = { registerUser , getUserByEmail};

