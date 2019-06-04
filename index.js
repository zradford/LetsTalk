const http = require('http')
const path = require('path')

const express = require('express')
const app = express()


//static files
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use("/", function(req, res, next){
   console.log(req.url)
   next()
})

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
   res
      .status(200)
      .sendFile(path.join(__dirname +'welcome.html'))
})