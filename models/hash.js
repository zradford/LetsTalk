const bcrypt = require('bcrypt');
const saltRounds = 10;


function hasher(plaintext){
   console.log("in hash.hasher")
   return bcrypt.hash(plaintext, saltRounds)
}


function checker(plaintext, hash) {
   console.log("in hash.checker")
   return bcrypt.compare(plaintext, hash)
}

module.exports = {
   hasher : hasher,
   checker : checker
};