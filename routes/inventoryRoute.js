// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory by Individual id view
router.get("/detail/:invId", invController.buildByInvId);

// Route to management view
router.get('/management', invController.buildManagement);

// Route to add new classification view
router.get('/newclassification', invController.buildNewClassification);

// Route to add new classification view
router.get('/newclassification', invController.registerNewClassification);

// Route to add new vehicle view
router.get('/newvehicle', invController.buildNewVehicle);

// Route to add new classification view
router.get('/newclassification', invController.buildNewVehicle);

module.exports = router;