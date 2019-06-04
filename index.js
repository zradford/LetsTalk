const http = require('http')
const express = require('express')
const app = express()


//static files
app.use(express.static('public'))

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
app.use('/', 'welcome.html')