const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
    errors: null,
  })
}

/* ***************************
 *  Build inventory by individual id view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getInventoryByInventoryId(inv_id)
  const info = await utilities.BuildInvInfo(data)
  let nav = await utilities.getNav()
  const invName = data[0].inv_year + ' ' + data[0].inv_make + ' ' + data[0].inv_model
  res.render("./inventory/singleInventory", {
    title: invName,
    nav,
    info,
    errors: null,
  })
}

invCont.buildManagement = async function(req, res, next) {
  let nav = await utilities.getNav()
  const classificationSelect = await utilities.buildClassificationList()
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    classificationSelect,
    errors: null,
  })
}

invCont.buildNewClassification = async function(req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/newclassification", {
    title: "New Classification",
    nav,
    errors: null,
  })
}

invCont.buildNewVehicle = async function(req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/newvehicle", {
    title: "New Vehicle",
    nav,
    errors: null,
  })
}

invCont.buildAllInventory = async function(req, res, next) {
  const data = await invModel.getInventory()
  const invgrid = await utilities.buildInventoryGrid(data)
  const invName = data[0].inv_year + ' ' + data[0].inv_make + ' ' + data[0].inv_model
  let nav = await utilities.getNav()
  res.render("./inventory/allInventory", {
    title: invName,
    nav,
    invgrid,
    errors: null,
  })
}

 /* ****************************************
*  Process New Classification
* *************************************** */
invCont.registerNewClassification = async function(req, res) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body

  const regResult = await inventoryModel.registerNewClassification(
    classification_name
  )

  if (regResult) {
    req.flash(
      "notice",
      `A new car classification has been added.`
    )
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the new classification failed to add.")
    res.status(501).render("inventory/newclassification", {
      title: "New Classification",
      nav,
      errors: null,
    })
  }
} 

/* ****************************************
*  Process New Vehicle
* *************************************** */
invCont.registerNewVehicle = async function(req, res) {
  let nav = await utilities.getNav()
  const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body

  const regResult = await inventoryModel.registerNewVehicle(
    classification_id, 
    inv_make, 
    inv_model, 
    inv_year, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color
  )

  if (regResult) {
    req.flash(
      "notice",
      `A new vehicle has been added.`
    )
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the new vehicle failed to add.")
    res.status(501).render("inventory/newvehicle", {
      title: "New Vehicle",
      nav,
      errors: null,
    })
  }
} 

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ****************************************
*  Process Edit Vehicle
* *************************************** */
invCont.editVehicle = async function(req, res, next) {
  let nav = await utilities.getNav()
  const inventory_id = parseInt(req.params.inventoryId)
  const data = await invModel.getInventoryByInventoryId(inventory_id)
  //const grid = await utilities.editVehicle(data)
  const itemName = `${data.inv_make} ${data.inv_model}`
  //const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body
  res.render("./inventory/editvehicle", {
    title: "Edit " + itemName,
    nav,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
} 

/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body
  const updateResult = await invModel.updateInventory(
    inv_id,  
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  } else {
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
    })
  }
}

module.exports = invCont