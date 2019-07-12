// requires for the database stuff will go here
const db = require('../models/database')
const hasher = require('./controllers/hash.js')

/**
 * 
 */
function login(err, data) {
   if(err) {console.log(err)}
   console.log(data.Username, data.Password)
  // db.checkLogin(data.username, data.login)
}

module.exports = {
   login : login
}