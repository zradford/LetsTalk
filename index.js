// code provided by microsoft
const appInsights = require("applicationinsights");
appInsights.setup("<instrumentation_key>");
appInsights.start();

const http = require('http')
const path = require('path')
const express = require('express')
const app = express()
const hbs = require('express-handlebars')

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))

// I am using handlebars
app.engine('hbs', hbs({extname: 'hbs',
                       defaultLayout: 'layout',
                       layoutsDir: __dirname + '/views/layouts'}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// start app
app.listen(PORT)

// generic middleware that tells me what is being accessed
app.all('/', (req, res, next) => {
   console.log("Requesting: " + req.url)
   next()
})

// basic routes
app.get("/", (req, res) => {
   res.render('index', {title: 'Hey', message: 'If you see this, txt me an emoji'})
})

app.get("/index", (req, res) =>{
   res.sendFile(path.join(__dirname,'public', 'index.html'))
})