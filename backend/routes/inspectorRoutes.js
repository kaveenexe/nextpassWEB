const express = require("express");
const router = express.Router();
const inspectorController = require("../controllers/inspectorController");

router.post("/add-inspector", inspectorController.addInspector);
router.get("/:id", inspectorController.getOneInspector);
router.get("/", inspectorController.getAllInspectors);
router.delete("/delete/:id", inspectorController.removeInspector);
router.put("/update/:id", inspectorController.updateInspector);

module.exports = router;
