const bcrypt = require('bcrypt')
const saltRounds = 10;

function hasher(password){
   bcrypt.hash(password, saltRounds).then(function(hash) {
    return hash;
});
}

function checker(plaintext, hash) {
   bcrypt.compare(myPlaintextPassword, hash).then(function(res) {
      return res;
});
}

module.exports = {
   hasher : hasher,
   checker : checker
}