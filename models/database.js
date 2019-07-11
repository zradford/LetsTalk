//database connection stuff from https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT * FROM user;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

function checkLogin(username, password){
   let query = `SELECT username, password FROM users WHERE username = ${username} AND password = ${password}`
   client.query(query, (err, res)=>{
      if(err) throw err;
      console.dir(res);
   })
   client.end();
}

function register(first, last, email, username, password) {
   client.query(`INSERT INTO users VALUES(DEFAULT, ${first}, ${last}, ${email}, ${username}, ${password})`,
   (err, res)=>{
      if(err) throw err;
      console.dir(res)
   });
   client.end()
}
module.exports = {
   checkLogin: checkLogin,
   register: register
}