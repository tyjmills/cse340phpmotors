// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

router.get("/allinventory", invController.buildAllInventory);

// Route to build inventory by Individual id view
router.get("/detail/:invId", invController.buildByInvId);

// Route to build inventory by Individual id view with URL
router.get("/edit/:invId", invController.editVehicle);

// Route to management view
router.get('/management', invController.buildManagement);

router.get("/getInventory/:classification_id", invController.getInventoryJSON)

// Route to add new classification view
router.get('/newclassification', invController.buildNewClassification);

// Route to add new classification view
router.post('/newclassification', invController.registerNewClassification);

// Route to add new vehicle view
router.get('/newvehicle', invController.buildNewVehicle);

// Route to add new classification view
router.post('/newclassification', invController.buildNewVehicle);

router.post("/update/", invController.updateInventory)

module.exports = router;