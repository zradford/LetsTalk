const bcrypt = require('bcrypt')
const saltRounds = 10;

function hasher(password){
   bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) throw err;

      bcrypt.hash(password, salt, function(err, hash) {
         if(err) throw err;
         // Store hash in your password DB.
         return hash;
      });
   });
}

function checker(plaintext, hash) {
   bcrypt.compare(plaintext, hash, function(err, res) {
      if(res == true) { return true } else return false;
});
}

module.exports = {
   hasher : hasher,
   checker : checker
}