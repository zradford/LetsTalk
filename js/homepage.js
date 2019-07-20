const db = require('../models/database')

function postNewTopic(){
   fetch('/api/topics',{
      method: 'POST',
      credentials: "include"
   })
   .then(response => {
    return response.json();
   })
   .then(myJson => {
      document.getElementById('myPosts').innerText = JSON.stringify(myJson);
   })
}

function post() {
   let topic_name = document.getElementById('newTopic').value;
   let user_id = 1  // how to get user id??
   let region = document.getElementById('region').value;
   let desc = document.getElementById('desc').value
   db.newTopic(user_id, topic_name, desc, region)
      .then( res =>{
         document.getElementById('myPosts') = res.stringify()
      }
}