const { db } = require("../firebaseConfig");

const addBus = async (req, res) => {
  try {
    const {
      date,
      driver,
      busNumber,
      startLocation,
      arrivalLocation,
      startTime,
      arrivalTime,
    } = req.body;

    // Validate input data
    if (
      !date ||
      !driver ||
      !busNumber ||
      !startLocation ||
      !arrivalLocation ||
      !startTime ||
      !arrivalTime
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }

    const potentialSchedules = await db
      .collection("busses")
      .where("busNumber", "==", busNumber)
      .where("date", "==", date)
      .get();

    // Then, filter the results in memory
    const conflictingSchedules = potentialSchedules.docs.filter((doc) => {
      const data = doc.data();
      return data.startTime <= arrivalTime && data.arrivalTime >= startTime;
    });

    if (conflictingSchedules.length > 0) {
      return res
        .status(400)
        .json({ error: "There is already a schedule with conflicting times." });
    }

    // Prepare the new schedule
    const newSchedule = {
      date,
      driver,
      busNumber,
      startLocation,
      arrivalLocation,
      startTime,
      arrivalTime,
      createdAt: new Date().toISOString(), // Current time in ISO format
    };

    // Add the new schedule to the collection
    await db.collection("busses").add(newSchedule);

    return res.status(201).json({
      message: "Bus schedule added successfully",
      schedule: newSchedule,
    });
  } catch (error) {
    console.error("Error adding bus schedule: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOneBus = async (req, res) => {
  try {
    const { id } = req.params; // assuming that the ID of the schedule is passed as a URL parameter

    const busSchedule = await db.collection("busses").doc(id).get();

    if (!busSchedule.exists) {
      return res.status(404).json({ error: "Bus schedule not found" });
    }

    res.json({ schedule: busSchedule.data() });
  } catch (error) {
    console.error("Error fetching bus schedule: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllBusses = async (req, res) => {
  try {
    const busSchedules = await db.collection("busses").get();
    const schedules = [];

    busSchedules.forEach((doc) =>
      schedules.push({ id: doc.id, ...doc.data() })
    );

    res.json({ schedules });
  } catch (error) {
    console.error("Error fetching bus schedules: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeBus = async (req, res) => {
  try {
    const { id } = req.params; // assuming that the ID of the schedule is passed as a URL parameter

    await db.collection("busses").doc(id).delete();

    res.json({ message: "Bus schedule deleted successfully" });
  } catch (error) {
    console.error("Error deleting bus schedule: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBus = async (req, res) => {
  try {
    const { id } = req.params; // assuming that the ID of the schedule is passed as a URL parameter
    const updates = req.body; // data that needs to be updated

    const busSchedule = await db.collection("busses").doc(id).get();

    if (!busSchedule.exists) {
      return res.status(404).json({ error: "Bus schedule not found" });
    }

    await db.collection("busses").doc(id).update(updates);

    res.json({ message: "Bus schedule updated successfully" });
  } catch (error) {
    console.error("Error updating bus schedule: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addBus,
  getOneBus,
  getAllBusses,
  removeBus,
  updateBus,
};
