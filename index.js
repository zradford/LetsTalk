const http = require('http')
const express = require('express')
const port = process.env.PORT || 3000

const server = http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    console.log('server received request.')
    response.end("Hello Azure!");
});

server.listen(port, err  => {
   if(err){
      console.log(err);
   } else {
      console.log(`Server listening on port ${port}`);
   }
});
