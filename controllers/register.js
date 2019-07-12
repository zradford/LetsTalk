const db = require('../models/database')
const hasher = require('../models/hash')

function register(err, data) {
   if(err) console.log(err)
   let hashed = hasher.hasher(data.password)
   console.log("hashed password: $1", hashed);
   //db.register(data.first, data.last, data.email, data.username,hashed)
}

module.exports = {
   register : register
}