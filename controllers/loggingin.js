// requires for the database stuff will go here
const db = require('../models/database')

/**
 * receives info from user
 * sends info to database
 */
function login(err, data) {
   if(err) {console.log(err)}
   console.log("in loggingin.js: login()")
   console.log("data = " + data.username, data.password)
   db.checkLogin(data.username, data.password)
}

module.exports = {
   login : login
}