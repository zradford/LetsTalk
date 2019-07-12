const db = require('../models/database')
const hasher = require('../models/hash')

function register(err, data) {
   console.log("in register.js: register()")
   if(err) {
      console.log(err) 
      throw err;
   }
   let hashed = hasher.hasher(data.password)
   hashed.then(console.log("hashed password: ", hashed))
         .catch(e => console.error(e))
   
   //db.register(data.first, data.last, data.email, data.username,hashed)
}

module.exports = {
   register : register
}