const express = require("express");
const bodyParser = require("body-parser");
const { db } = require("./firebaseConfig");
require("dotenv").config();

const busRoutes = require("./routes/busRoutes");
const inspectorRoutes = require("./routes/inspectorRoutes");

const app = express();

app.use(bodyParser.json());

// Bus Routes
app.use("/buses", busRoutes);

// Inspector Routes
app.use("/inspectors", inspectorRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
