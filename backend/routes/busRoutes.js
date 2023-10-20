const express = require("express");
const router = express.Router();
const busController = require("../controllers/busController");

router.post("/add-bus", busController.addBus);
router.get("/:id", busController.getOneBus);
router.get("/", busController.getAllBusses);
router.delete("/delete/:id", busController.removeBus);
router.put("/update/:id", busController.updateBus);

module.exports = router;
