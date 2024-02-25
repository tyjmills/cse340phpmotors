const invModel = require("../models/inventory-model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
  }

/* **************************************
* Build the inventory view HTML
* ************************************ */

Util.BuildInvInfo = async function(data) {
  let info
  if(data.length > 0){
    info ='<ul id="inv-info">'
    data.forEach(vehicle => {
      info += '<li>'
      info += vehicle.inv_year + ' ' + vehicle.inv_make + ' ' + vehicle.inv_model
      info += '</li>'
      info += '<li>'
      info += '<a href="../../inv/detail/' + vehicle.inv_id
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      info += '</li>'
      info += '<li>'
      info += vehicle.inv_make + ' ' + vehicle.inv_model + ' Details'
      info += '</li>'
      info += '<li>'
      info += 'Price: $' + vehicle.inv_price
      info += '</li>'
      info += '<li>'
      info += 'Description: ' + vehicle.inv_description
      info += '</li>'
      info += '<li>'
      info += 'Color: ' + vehicle.inv_color
      info += '</li>'
      info += '<li>'
      info += 'Miles: ' + vehicle.inv_miles
      info += '</li>'
    })
    info += '</ul>'
  } else {
    info += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return info
}

/* **************************************
* Build the login view HTML
* ************************************ */
Util.buildLogin 
    login = '<div class="container">'
    login += '<label for="email"><b>Email:</b></label>'
    login += '<input type="email" placeholder="Enter Email" name="account_email" required>'

    login += '<label for="psw"><b>Password:</b></label>'
    login += '<input type="password" placeholder="Enter Password" name="account_password" required>'

    login += '<button type="submit">Login</button>'
    
    login += '<label for="newacc"><b>No Account?</b></label>'
    login += '<a href="/account/register" title="Sign-up">Sign-up</a>'
    login += '</div>'

  /* **************************************
* Build the register view HTML
* ************************************ */
Util.buildRegister 
register = '<div class="container">'
register += '<label for="firstname"><b>First name:</b></label>'
register += '<input type="text" placeholder="Enter first name" name="account_firstname" required>'

register += '<label for="lastname"><b>Last name:</b></label>'
register += '<input type="text" placeholder="Enter last name" name="account_lastname" required>'

register += '<label for="email"><b>Email:</b></label>'
register += '<input type="email" placeholder="Enter Email" name="account_email" required>'

register += '<label for="psw"><b>Password:</b></label>'
register += '<span>* Passwords must be at least 12 characters and contain at least 1 number, 1 capital letter and 1 special character</span>'
register += '<input type="password" placeholder="Enter Password" name="account_password"  required>'// pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{12,}$">'

register += '<button type="submit">Register</button>'

register += '</div>'

/* **************************************
* Build the management view HTML
* ************************************ */
Util.buildManagement
    manage = '<div class="container">'
    manage += '<a href="./newclassification" title="add classification">Add New Classification</a>'
    manage += '<a href="./newvehicle" title="add vehicle">Add New Vehicle</a>'
    manage += '</div>'

 /* **************************************
* Build the create new classification view HTML
* ************************************ */
Util.buildNewClassification
  newclass = '<div class="container">'
  newclass += '<label for="firstname"><b>Classification Name:</b></label>'
  newclass += '<span>NAME MUST BE ALPHABETIC CHARACTERS ONLY.</span>'
  newclass += '<input type="text" placeholder="Enter new classification" name="classification_name" required>'
  newclass += '<button type="submit">Add Classification</button>'
  newclass += '</div>'

/* **************************************
* Build the create new vehicle view HTML
* ************************************ */
Util.buildNewVehicle 
newvehicle = '<div class="container">'
newvehicle += '<label for="classification"><b>Classification:</b></label>'
newvehicle += '<select id="class" name="classification_name">'
newvehicle += '<option value="1">Custom</option>'
newvehicle += '<option value="2">Sport</option>'
newvehicle += '<option value="3">SUV</option>'
newvehicle += '<option value="4">Truck</option>'
newvehicle += '<option value="5">Sedan</option>'
newvehicle += '</select>'

newvehicle += '<label for="make"><b>Make:</b></label>'
newvehicle += '<input type="text" placeholder="Min of 3 characters" name="inv_make" required>'

newvehicle += '<label for="model"><b>model:</b></label>'
newvehicle += '<input type="email" placeholder="Min of 3 characters" name="inv_model" required>'

newvehicle += '<label for="year"><b>Year:</b></label>'
newvehicle += '<input type="text" placeholder="4-digit year" name="inv_year" required>'

newvehicle += '<label for="description"><b>Description:</b></label>'
newvehicle += '<input type="text" name="inv_description" required>'

newvehicle += '<label for="lastname"><b>Image Path:</b></label>'
newvehicle += '<input type="text" value="..images/vehicles/no-image.png" name="inv_image" required>'

newvehicle += '<label for="lastname"><b>Thumbnail Path:</b></label>'
newvehicle += '<input type="text" value="..images/vehicles/no-image-tn.png" name="inv_thumbnail" required>'

newvehicle += '<label for="lastname"><b>Price:</b></label>'
newvehicle += '<input type="text" placeholder="Decimal or integer" name="inv_price" required>'

newvehicle += '<label for="lastname"><b>Miles:</b></label>'
newvehicle += '<input type="text" placeholder="digits only" name="inv_miles" required>'

newvehicle += '<label for="lastname"><b>Color:</b></label>'
newvehicle += '<input type="text" name="inv_color" required>'

newvehicle += '<button type="submit">Add Vehicle</button>'

newvehicle += '</div>'

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
 }

 /* ****************************************
 *  Check Login
 * ************************************ */
 Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
 }

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util