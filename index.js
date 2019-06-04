const http = require('http')
const path = require('path')
const express = require('express')
const app = express()

var options = {
  index: 'index.html'
};
app.use('/', express.static('/home/site/wwwroot', options));



//static files
app.use('/static', express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 3000

// start app
app.listen(port, err  => {
   if(err){
      console.log(err);
   } else {
      console.log(`Server listening on port ${port}`);
   }
});


// basic routes
app.get("/", function(req, res) {
   console.log(__dirname)

   res
      .status(200)
      .sendFile(path.join(__dirname +'welcome.html'))
})