const bcrypt = require('bcrypt')
const saltRounds = 10;

function hasher(password){
   bcrypt.hash(password, saltRounds)
      .then(function(hash) {
         console.log(hash)
         return hash;
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