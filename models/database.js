//database connection stuff from https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
const { Client } = require('pg');
const hasher = require('../models/hash')

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

// take the user's plaintext and compare it with the database's hash
function checkLogin(username, password){
   let hashed = hasher.hasher(password);
   let query = "SELECT username, password FROM users WHERE username = $1 AND password = $2"
   let values = [username, hashed]
   client.query(query, values)
      .then(res => console.dir(res.rows))
      .catch(e => console.error(e.stack)) 

}

function register(first, last, email, username, password) {
   let query = "INSERT INTO users (user_id, first_name, last_name, email, username, hash_pass) VALUES(DEFAULT, $1, $2, $3, $4, $5)";
   let values = [first, last, email, username, password,]
   client.query(query, values)
      .then(res => console.dir(res.rows))
      .catch(e => console.error(e.stack))
}
module.exports = {
   checkLogin: checkLogin,
   register: register
}