//database connection stuff from https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
const { Client } = require('pg');
const hasher = require('../models/hash')

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect()

// take the user's plaintext and compare it with the database's hash
function checkLogin(username, password){
   console.log("in database.checklogin()")
   const hashed = hasher.hasher(password);
   const query = "SELECT username, hash_pass FROM users WHERE username = $1 AND hash_pass = $2";
   const values = [username, hashed]
   client.query(query, values)
      .then(res => console.dir(res.rows))
      .catch(e => console.error(e.stack));
}

function registerUser(data) {
   console.log("in database.register()")
   const query = "INSERT INTO users (user_id, first_name, last_name, email, username, hash_pass) VALUES(DEFAULT, $1, $2, $3, $4, $5)";
   const values = [data.first, data.last, data.email, data.username, data.password];
   client.query(query, values)
      .then(res => console.log("stored: " + res.rows[0] + "in db"))
      .catch(e => console.error(e.stack));
}

module.exports = {
   checkLogin : checkLogin,
   registerUser : registerUser
};