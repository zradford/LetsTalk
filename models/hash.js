const { db } = require('./database');
const bcrypt = require('bcrypt');
const saltRounds = 10;


function hasher(data){
   console.log("in hash.js: hasher()")
   bcrypt.hash(data.password, saltRounds)
      .then(function(hash) {
         data.password = hash;
         console.log(data)
         db.registerUser(data);
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