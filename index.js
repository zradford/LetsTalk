const http = require('http')
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000


// I am using handlebars
app.set('view engine', 'handlebars')

// start app
app.listen(port)

// generic middleware that tells me what is being accessed
app.all('/', function(req, res, next){
   console.log("Requesting: " + req.url)
   next()
})

// basic routes
app.get("/", function(req, res) {
   res.render('index', {title: 'Hey', message: 'Hello There!'})
})