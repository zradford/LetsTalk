function postNewTopic(){
   let topic_name = document.getElementById('newTopic').value;
   let region = null
   let desc = document.getElementById('desc').value

   let reqBody = {
      topic_name: topic_name,
      region : region,
      desc: desc
   }


   fetch('/api/topics', {
      method: 'POST',
      credentials: "include",
      body: JSON.stringify(reqBody),
      headers : {
         'Content-Type': 'application/json'
      }
   })
   .then(response => {
    return response.json();
   })
   .then(myJson => {
      document.getElementById('myPosts').innerText = myJson.topic_name
   })
}

function newRegions(){
   let myForm = document.getElementById('setRegions');
   let formData = new FormData(myForm);
   fetch('/api/regions', {
      method: 'POST',
      credentials: "include",
      body: formData,
   })
   .then(response => {
    return response.json();
   })
}