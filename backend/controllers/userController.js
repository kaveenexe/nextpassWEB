// const userModel = require('../models/user');
// const { generateQRCode } = require('../controllers/qrcodeGenerator'); // Adjust the path according to your project structure

// const registerUser = (req, res) => {
//   const { name, email, password, contactNumber } = req.body;

//   // Validation of data
//   if (!name || !email || !password || !contactNumber) {
//     return res.status(400).send('Please provide all required details.');
//   }

//   userModel.createUser(name, email, password, contactNumber)
//     .then((userRecord) => {
//       // Generating QR code
//       let userData = {
//         name: name,
//         email: email,
//         contactNumber: contactNumber
//       };

//       let stringData = JSON.stringify(userData);

//       generateQRCode(stringData)
//         .then((qrCode) => {
//           // Save the QR code to the user's document
//           userModel.saveQRCode(userRecord.uid, qrCode)
//             .then(() => {
//               return res.status(200).send('User registered successfully!');
//             })
//             .catch((error) => {
//               return res.status(500).send('Error saving QR code: ' + error);
//             });
//         })
//         .catch((error) => {
//           console.error('Error generating QR code:', error);
//           return res.status(500).send('Error generating QR code.');
//         });
//     })
//     .catch((error) => {
//       return res.status(500).send('Error registering user: ' + error);
//     });
// };

// //get user
// const getUserByEmail = (req, res) => {
//   const { email } = req.params;

//   userModel.getUserByEmail(email)
//     .then((userData) => {
//       if (userData) {
//         return res.status(200).json(userData);
//       } else {
//         return res.status(404).send('User not found.');
//       }
//     })
//     .catch((error) => {
//       return res.status(500).send('Error retrieving user: ' + error);
//     });
// };

// module.exports = { registerUser, getUserByEmail };
