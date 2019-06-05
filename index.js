const http = require('http')
const path = require('path')
const express = require('express')
const hbs = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000


// I am using handlebars
app.engine('hbs', hbs({extname: 'hbs',
                       defaultLayout: 'layout',
                       layoutsDir: __dirname + '/views/layouts'}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// start app
app.listen(port)

// generic middleware that tells me what is being accessed
app.all('/', function(req, res, next){
   console.log("Requesting: " + req.url)
   next()
})

// basic routes
app.get("/", function(req, res) {
   res.render('index', {title: 'Hey', message: 'If you see this, txt me an emoji'})
})