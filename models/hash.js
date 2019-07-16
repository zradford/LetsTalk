const bcrypt = require('bcrypt');
const saltRounds = 10;


function hasher(plaintext){
   console.log("in hash.hasher")
   return new Promise((resolve, reject) => {
      bcrypt.hash(plaintext, saltRounds)
         .then(res => resolve(res))
         .catch(e => reject(e));
   })
}


function checker(plaintext, hash) {
   console.log("in hash.checker")
   return new Promise((resolve, reject) => {
      bcrypt.compare(plaintext, hash)
         .then(res => resolve(res))
         .catch(e => reject("Incorrect Password, please try again"));
      })
}

module.exports = {
   hasher : hasher,
   checker : checker
};