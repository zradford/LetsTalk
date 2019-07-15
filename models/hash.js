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
   // plaintext = "" + plaintext;
   // hash = "" + hash;
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