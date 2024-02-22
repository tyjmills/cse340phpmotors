const invModel = require("../models/inventory-model")
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
    login += '<input type="text" placeholder="Enter Email" name="email" required>'

    login += '<label for="psw"><b>Password:</b></label>'
    login += '<input type="password" placeholder="Enter Password" name="psw" required>'

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
register += '<input type="text" placeholder="Enter Email" name="account_email" required>'

register += '<label for="psw"><b>Password:</b></label>'
register += '<input type="password" placeholder="Enter Password" name="account_password" required>'

// register += '<ul class="passwordinfo>'    
// register += '<li>12 characters in length, minimum</li>'
// register += '<li>contain at least 1 capital letter</li>'
// register += '<li>contain at least 1 number</li>'
// register += '<li>contain at least 1 special character</li>'
// register += '</ul>'

register += '<button type="submit">Register</button>'

register += '</div>'


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util