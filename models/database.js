const user = require('../controllers/users')
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
      console.log("in database.checklogin()")
      
      const query = "SELECT hash_pass, user_id FROM users WHERE username = $1";
      const values = [username]
      return client.query(query, values)
         .then(r => {
            console.log('going to hasher.checker')
            return hasher.checker(password, r.rows[0].hash_pass)
         })
         .catch(e => { 
            console.error(e.message)
         })
         // .finally(() => {
         //    console.log("calling finally in db.checklogin")
         //    client.end()
         // })
}

function registerUser(data) {
   console.log("in database.registerUSER()")
   const query = "INSERT INTO users (user_id, first_name, last_name, email, username, hash_pass) VALUES(DEFAULT, $1, $2, $3, $4, $5) RETURNING *";
   const values = [data.first, data.last, data.email, data.username, data.password];
   return client.query(query, values)
      .then(r => { 
         console.log(r.rows)
         return new Promise((resolve, reject) => {
            if(r.rowCount == 0) {
                reject('reject') 
            } else resolve(r.rows[0]);
         })
      })
      .catch(e => console.error(e.stack))
      // .finally(() => {
      //    console.log("calling finally in db.registerUser")
      //    client.end()
      // })
}

function getUserId(id){
   console.log('in db.getUserId')
   let query = "SELECT * FROM users WHERE user_id = $1";
   let values = [id];
   return client.query(query, values)
      .then(res => res.rows[0])
      .catch(e => console.error(e.stack))
      // .finally(() => client.end())
}

function getUser(username) {
   console.log('in db.getUser')
   let query = "SELECT * FROM users WHERE username = $1"
   let values = [username];
   return client.query(query, values)
      .then(res => {
         return new Promise((resolve, reject) => {
            if(res.rowCount == 0) {
                reject('reject') 
            } else {
               console.log("result of get user query: " + res.rows[0])
               resolve(res.rows[0]);
            }
         })
      })
      .catch(e => console.error(e.stack))
      // .finally(() => client.end())
}

function getUserData(username) {
   console.log('in db.getUserData')
   let query ="SELECT t.topic_name, t.description FROM topic t INNER JOIN users u ON t.region = u.region_one OR t.region = u.region_two OR t.region = u.region_three WHERE u.username = $1"
   let values = [username]
   return client.query(query, values)
      .then(res => {
         return new Promise((resolve, reject) => {
            if(res.rowCount == 0) {
                reject('reject') 
            } else {
               console.log("returning userData")
               resolve(res.rows);
            }
         })
      })
      .catch(e => console.error(e.stack))
      // .finally(() => client.end())
}

function newTopic(user_id, name, desc, region) {
   let query = "INSERT INTO topic VALUES(DEFAULT, $1, $2, $3, $4) RETURNING *"
   let values = [user_id, name, desc, region]
   return client.query(query, values)
}

function getUserRegions(username) {
   let query = "SELECT r.region_id, r.region_name FROM region r JOIN users u ON r.region_id = u.region_one OR r.region_id = u.region_two OR r.region_id = u.region_three WHERE u.username  = $1"
   let values = [username]
   return client.query(query, values)
   .then(data => {
      console.log("this is in getUserRegions " + data)
      return data
   })
}

function setUserRegions(rOne, rTwo, rThree, username) {
   let query = "UPDATE users SET region_one = $1, region_two = $2, region_three = $3 WHERE username = $4;"
   let values = [rOne, rTwo, rThree, username]
   return client.query(query, values)
}

function getAllRegions(){
   return client.query("select * from region")
      .then(data => {
         console.dir(data)
      })
}


module.exports = {
   checkLogin : checkLogin,
   registerUser : registerUser,
   getUserId : getUserId,
   getUser : getUser,
   getUserData : getUserData,
   newTopic : newTopic,
   getUserRegions : getUserRegions, 
   setUserRegions : setUserRegions,
   getAllRegions : getAllRegions
};