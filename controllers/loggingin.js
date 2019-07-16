// requires for the database stuff will go here
const db = require('../models/database')

/**
 * receives info from user
 * sends info to database
 */
function login(data) {
   return new Promise((resolve, reject) => {
      if(err) {console.log(err)}
   console.log("in loggingin.js: login()")
   db.checkLogin(data.username, data.password)
      .then(res => console.log("login successful: " + res))
      .catch(e => {
         return { err: "Error: " + e }
      })
   })
}

module.exports = {
   login : login
}