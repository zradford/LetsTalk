const db = require('../models/database')


function register(err, data) {
   if(err) console.log(err)
   db.register(data.first, data.last, data.email, data.username, data.password)
}

module.exports = {
   register : register
}