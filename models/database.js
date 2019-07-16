//database connection stuff from https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
const { Client } = require('pg');
const hasher = require('../models/hash')

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect()

// take the user's plaintext and compare it with the database's hash
// check this out to update this code!! -> https://stackoverflow.com/questions/40776251/handling-postgres-error-message-to-perform-correct-query
function checkLogin(username, password){
   return new Promise((resolve, reject) => {
      console.log("in database.checklogin()")
      
      const query = "SELECT hash_pass FROM users WHERE username = $1";
      const values = [username]
      client.query(query, values)
         .then(r => {
            console.log("after the query")
            return hasher.checker(password, r.rows[0].hash_pass)
         })
         .then(r => {
            console.log("after the hash")
            resolve(r)
         })
         .catch(e => { 
            console.error(e.message)
            reject(e) 
         })
          .then(() => client.end())
   })
}

function registerUser(data) {
   console.log("in database.register()")
   const query = "INSERT INTO users (user_id, first_name, last_name, email, username, hash_pass) VALUES(DEFAULT, $1, $2, $3, $4, $5)";
   const values = [data.first, data.last, data.email, data.username, data.password];
   client.query(query, values)
      .then(r => console.log("stored: " + r.rows[0] + "in db"))
      .catch(e => console.error(e.stack))
      .then(() => client.end())
}

module.exports = {
   checkLogin : checkLogin,
   registerUser : registerUser
};