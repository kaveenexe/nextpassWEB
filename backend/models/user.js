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

//get user
const getUserByEmail = (email) => {
  return admin.auth().getUserByEmail(email)
    .then((userRecord) => {
      return db.collection('users').doc(userRecord.uid).get()
        .then((doc) => {
          if (doc.exists) {
            return doc.data();
          } else {
            return null;
          }
        })
        .catch((error) => {
          console.error('Error getting user document:', error);
          throw error;
        });
    })
    .catch((error) => {
      console.error('Error fetching user:', error);
      throw error;
    });
};

module.exports = { createUser , getUserByEmail};
