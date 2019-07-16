// requires for the database stuff will go here
const db = require('../models/database')

/**
 * receives info from user
 * sends info to database
 */
function login(error, data) {
   // if(error) { reject(error) }
   console.log("in loggingin.js: login()")
   return db.checkLogin(data.username, data.password)
}

module.exports = {
   login : login
}