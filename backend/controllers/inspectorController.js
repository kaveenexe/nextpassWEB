const { db } = require("../firebaseConfig");

const addInspector = async (req, res) => {
  try {
    const { name, email, phone, busNumber, assignedRoute, noOfShifts } =
      req.body;

    // Validate input data
    if (
      !name ||
      !email ||
      !phone ||
      !busNumber ||
      !assignedRoute ||
      !noOfShifts
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    const phonePattern = /^\+?[1-9]\d{1,14}$/; 
    if (!phonePattern.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number format." });
    }

    const newInspector = {
      name,
      email,
      phone,
      busNumber,
      assignedRoute,
      noOfShifts,
      createdAt: new Date().toISOString(), // Current time in ISO format
    };

    await db.collection("inspectors").add(newInspector);
    return res.status(201).json({
      message: "Inspector added successfully",
      inspector: newInspector,
    });
  } catch (error) {
    console.error("Error adding inspector: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOneInspector = async (req, res) => {
  try {
    const inspectorId = req.params.id;
    const inspectorDoc = await db
      .collection("inspectors")
      .doc(inspectorId)
      .get();

    if (!inspectorDoc.exists) {
      return res.status(404).json({ error: "Inspector not found" });
    }

    const inspectorData = inspectorDoc.data();
    return res.status(200).json(inspectorData);
  } catch (error) {
    console.error("Error fetching inspector:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get the details of all inspectors
const getAllInspectors = async (req, res) => {
  try {
    const inspectorQuerySnapshot = await db.collection("inspectors").get();
    const inspectors = [];
    inspectorQuerySnapshot.forEach((doc) => {
      inspectors.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return res.status(200).json(inspectors);
  } catch (error) {
    console.error("Error fetching inspectors:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to update the details of an inspector
const updateInspector = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, busNumber, assignedRoute, noOfShifts } =
      req.body; // add or remove fields as needed

    // Validate the existence of the document to update
    const inspectorDoc = await db.collection("inspectors").doc(id).get();
    if (!inspectorDoc.exists) {
      return res.status(404).json({ error: "Inspector not found" });
    }

    const updatedInspector = {
      name,
      email,
      phone,
      busNumber,
      assignedRoute,
      noOfShifts, // add or remove fields as needed
      // You might also want to add a field for when the document was last updated
      updatedAt: new Date().toISOString(),
    };

    await db.collection("inspectors").doc(id).update(updatedInspector);

    return res.status(200).json({ message: "Inspector updated successfully" });
  } catch (error) {
    console.error("Error updating inspector:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to delete an inspector
const removeInspector = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the existence of the document to delete
    const inspectorDoc = await db.collection("inspectors").doc(id).get();
    if (!inspectorDoc.exists) {
      return res.status(404).json({ error: "Inspector not found" });
    }

    await db.collection("inspectors").doc(id).delete();

    return res.status(200).json({ message: "Inspector deleted successfully" });
  } catch (error) {
    console.error("Error deleting inspector:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export the functions
module.exports = {
  addInspector,
  getOneInspector,
  getAllInspectors,
  updateInspector,
  removeInspector,
};