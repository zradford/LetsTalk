const bcrypt = require('bcrypt');
const saltRounds = 10;


function hasher(plaintext){
   //I hope this works
   return new Promise((resolve, reject) => {
      console.log("in hash.js: hasher()");
      bcrypt.hash(plaintext, saltRounds)
         .then(function(hash) {
            resolve(hash);
         })
         .catch(e => reject(e));
   })
}


function checker(plaintext, hash) {
   return new Promise((resolve, reject) => {
      // plaintext = "" + plaintext;
      // hash = "" + hash;
      bcrypt.compare(plaintext, hash)
         .then(function(res) {
            resolve(res);
         })
         .catch(e => reject(e));
      })
}

module.exports = {
   hasher : hasher,
   checker : checker
};