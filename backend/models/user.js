// const admin = require('firebase-admin');
// const db = admin.firestore();

// //create new user
// const createUser = (name, email, password, contactNumber) => {
//   return admin.auth().createUser({
//     email: email,
//     password: password
//   }).then((userRecord) => {
//     return db.collection('users').doc(userRecord.uid).set({
//       name: name,
//       email: email,
//       contactNumber: contactNumber
//     });
//   });
// }

// //save qr code
// const saveQRCode = (userId, qrCode) => {
//   return db.collection('users').doc(userId).update({
//     qrCode: qrCode
//   });
// };

// //get userdata
// const getUserByEmail = (email) => {
//   return admin
//     .auth()
//     .getUserByEmail(email)
//     .then((userRecord) => {
//       return db
//         .collection('users')
//         .doc(userRecord.uid)
//         .get()
//         .then((doc) => {
//           if (doc.exists) {
//             const userData = doc.data();
//             const qrCode = userData.qrCode; // Retrieve the QR code from user data
//             return { userData, qrCode };
//           } else {
//             return null;
//           }
//         })
//         .catch((error) => {
//           console.error('Error getting user document:', error);
//           throw error;
//         });
//     })
//     .catch((error) => {
//       console.error('Error fetching user:', error);
//       throw error;
//     });
// };

// module.exports = { createUser , saveQRCode, getUserByEmail};
