const db = require('../models/database')
const bcrypt = require('bcrypt')
const saltRounds = 10;

function hasher(data){
   console.log("in hash.js: hasher()")
   bcrypt.hash(data.password, saltRounds)
      .then(function(hash) {
         console.log("sending to database.js")
         db.register(data.first, data.last, data.email, data.username, hash)
      })
      .catch(e => console.error(e));
}

function checker(plaintext, hash) {
   bcrypt.compare(plaintext, hash)
      .then(function(res) {
         return res;
      })
      .catch(e => console.error(e));
}

module.exports = {
   hasher : hasher,
   checker : checker
}