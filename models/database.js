//database connection stuff from https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

function checkLogin(username, password){
   let query = "SELECT username, password FROM users WHERE username = $1 AND password = $2"
   let values = [username, password]
   client.query(query, values, (err, res)=>{
      if(err) { console.log(err.stack) } else { console.dir(res.rows) }
   })
   client.end();
}

function register(first, last, email, username, password) {
   let query = "INSERT INTO users VALUES(DEFAULT, $1, $2, $3, $4, $5)";
   let values = [first, last, email, username, password]
   client.query(query, values, (err, res)=>{
      if(err) { console.log(err) } else { console.dir(res.rows) }
   });
   client.end()
}
module.exports = {
   checkLogin: checkLogin,
   register: register
}