const db = require('../models/database')

function newTopic() {
   let area = document.getElementById('newTopic')
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         document.getElementById("demo").innerHTML = this.responseText;
      }
   };
  xhttp.open("GET", "/newPost", true);
  xhttp.send();
}