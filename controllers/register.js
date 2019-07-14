const hasher = require('../models/hash')
const db = require('../models/database')


function register(err, data) {
   console.log("in register.js: register()")
   if(err) {
      console.log(err) 
      throw err;
   }
   console.log("going to hash.js for storage")
   hasher.hasher(data.password)
      .then(res => {
         data.password = res;
         db.registerUser(data)
      })
}

module.exports = {
   register : register
}