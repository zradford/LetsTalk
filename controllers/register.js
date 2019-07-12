const hasher = require('../models/hash')

function register(err, data) {
   console.log("in register.js: register()")
   if(err) {
      console.log(err) 
      throw err;
   }
   console.log("going to hash.js for storage")
   hasher.hasher(data)
}

module.exports = {
   register : register
}