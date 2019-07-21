function postNewTopic(){
   let topic_name = document.getElementById('newTopic').value;
   let desc = document.getElementById('desc').value

   let region_el = document.getElementById('region')
   let region = region_el.options[region_el.selectedIndex].value;
   let region_name = region_el.options[region_el.selectedIndex].text

   let reqBody = {
      topic_name : topic_name,
      region : region,
      desc : desc,
      region_name : region_name
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
   // .then(myJson => {
   //    console.log("in the /topics fetch .then: " + myJson)
   //    document.getElementById('myPosts').innerHTML = `<div><h4>${myJson[0].topic_name}</h4> 
   //                                                    <p>${myJson[0].region}</p></div>`
   // })
}

function newRegions(){
   let el_one = document.getElementById('country')
   let id_one = el_one.options[el_one.selectedIndex].value;

   let el_two = document.getElementById('state')
   let id_two = el_two.options[el_two.selectedIndex].value

   let el_three = document.getElementById('city')
   let id_three = el_three.options[el_three.selectedIndex].value


   let reqBody = {
      id_one : id_one,
      id_two : id_two,
      id_three : id_three
   }


   fetch('/api/regions', {
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
}