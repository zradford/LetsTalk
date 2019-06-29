// requires for the database stuff will go here
const db = require('models/database.js')

/**
 * 
 */
function login(err, data) {
   if(err) {console.log(err)}

   db.checkLogin(data.username, data.login)

}


module.exports = {
   login : login
}