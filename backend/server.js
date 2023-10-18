const express = require("express");
const bodyParser = require("body-parser");
const {db} = require( "./firebaseConfig" );
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

// app.get("/users", async (req, res) => {
//   try {
//     const usersQuerySnapshot = await db.collection("users").get();
//     const users = [];
//     usersQuerySnapshot.forEach((doc) => {
//       users.push({
//         id: doc.id,
//         data: doc.data(),
//       });
//     });
//     res.json(users);
//   } catch (error) {
//     console.log("Error getting users: ", error);
//     res.status(500).send(error);
//   }
// });

// Add more routes here

// Import the QR code generator module
const { generateQRCode } = require("./controllers/qrcodeGenerator");

const userRoutes = require('./routes/userRoutes');

// Other app configurations and server setup
app.use('/api/user', userRoutes);

// Creating the data
let data = {
    name: "Passenger Name",
    age: 27,
    startpoint: "Colombo",
    endpoint: "Kandy",
    id: "aisuoiqu3234738jdhf100223"
};

// Converting the data into String format
let stringdata = JSON.stringify(data);

// Print the QR code to the console
generateQRCode(stringdata)
    .then(code => {
        // Printing the code
        // console.log(code);  //want
    })
    .catch(error => {
        console.error(error);
    });


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log( `Server is running on port ${ PORT }` );
  console.log("Connected to Firebase");
});
