const bcrypt = require('bcrypt');
const saltRounds = 10;


function hasher(plaintext){
   console.log("in hash.js: hasher()");
   bcrypt.hash(plaintext, saltRounds)
      .then(function(hash) {
         return hash;
      })
      .catch(e => console.error(e));
}

function checker(plaintext, hash) {
   plaintext = "" + plaintext;
   hash = "" + hash;
   bcrypt.compare(plaintext, hash)
      .then(function(res) {
         console.log(res)
         return res;
      })
      .catch(e => console.error(e));
}

module.exports = {
   hasher : hasher,
   checker : checker
};