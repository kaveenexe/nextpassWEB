const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const busRoutes = require("./routes/busRoutes");
const inspectorRoutes = require( "./routes/inspectorRoutes" );
const cors = require( 'cors' );

require("dotenv").config();
const app = express();
app.use(cors()); 

app.use(bodyParser.json());
app.use("/auth", authRoutes);

// Bus Routes
app.use("/buses", busRoutes);

// Inspector Routes
app.use("/inspectors", inspectorRoutes);

// Import the QR code generator module
const { generateQRCode } = require("./controllers/qrcodeGenerator");

const userRoutes = require("./routes/userRoutes");

// Other app configurations and server setup
app.use("/api/user", userRoutes);

// // Creating the data
// let data = {
//   name: "Passenger Name",
//   age: 27,
//   startpoint: "Colombo",
//   endpoint: "Kandy",
//   id: "aisuoiqu3234738jdhf100223",
// };

// // Converting the data into String format
// let stringdata = JSON.stringify(data);

// // Print the QR code to the console
// generateQRCode(stringdata)
//   .then((code) => {
//     // Printing the code
//     console.log(code); //want
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Connected to Firebase");
});
