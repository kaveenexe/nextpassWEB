const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://nextpass-51ccb-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.firestore();

module.exports = { admin, db };
