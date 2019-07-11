const db = require('../models/database')


function register(err, data) {
   if(err) console.log(err)
   db.register()
}

module.exports = {
   register : register
}