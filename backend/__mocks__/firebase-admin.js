const database = {
  // Mock functions here (like .doc, .get, etc.)
};

const firestore = () => {
  return database;
};

const admin = {
  firestore,
};

module.exports = admin;