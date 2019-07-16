// requires for the database stuff will go here
const db = require('../models/database')

/**
 * receives info from user
 * sends info to database
 */
function login(error, data) {
   return new Promise((resolve, reject) => {
      if(error) { reject(error) }
      console.log("in loggingin.js: login()")
      db.checkLogin(data.username, data.password)
         .then(res => resolve(res))
         .catch(e => reject({ err: "Error: " + e }))
   })
}

module.exports = {
   login : login
}