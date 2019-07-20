function postNewTopic(){
   let topic_name = document.getElementById('newTopic').value;
   let region = null
   let desc = document.getElementById('desc').value

   let reqBody = new FormData();
   reqBody.append('topic_name', topic_name)
   reqBody.append('region', region)
   reqBody.append('desc', desc)

   
   fetch('/api/topics', {
      method: 'POST',
      credentials: "include",
      body: reqBody
   })
   .then(response => {
    return response.json();
   })
   .then(myJson => {
      document.getElementById('myPosts').innerText = myJson.stringify(myJson);
   })
}