//database connection stuff from https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

function checkLogin(username, password){
   console.log({username, password})
   let query = `SELECT username, password FROM users WHERE username = ${username} AND password = ${password}`
   client.query(query, (err, res)=>{
      if(err) {console.log(err)}
      console.dir(res);
   })
   client.end();
}

function register(first, last, email, username, password) {
   console.log({first, last, email, username, password})
   let query = `INSERT INTO users VALUES(DEFAULT, ${first}, ${last}, ${email}, ${username}, ${password})`;
   client.query(query, (err, res)=>{
      if(err) {console.log(err)}
      console.dir(res)
   });
   client.end()
}
module.exports = {
   checkLogin: checkLogin,
   register: register
}