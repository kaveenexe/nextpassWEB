const admin = require('firebase-admin');
const db = admin.firestore();

const createUser = (name, email, password, contactNumber) => {
  return admin.auth().createUser({
    email: email,
    password: password
  }).then((userRecord) => {
    return db.collection('users').doc(userRecord.uid).set({
      name: name,
      email: email,
      contactNumber: contactNumber
    });
  });
};

module.exports = { createUser };
