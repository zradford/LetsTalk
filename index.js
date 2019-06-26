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
app.engine('hbs', hbs( {
   extname: 'hbs',
   defaultLayout: 'default',
   layoutsDir: __dirname + '/views/layouts',
   partialsDir: __dirname + '/views/partials'
}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// start app
app.listen(PORT)

// generic middleware that tells me what is being accessed
app.use((req, res, next) => {
   console.log("Requesting: " + req.url)
   next()
})


// basic routes
app.get("/", (req, res) =>{
   res.render('index')
})

app.get('/login', (req, res) => {
   res.render('login')
})

app.get('/signup', (req, res) => {
   res.render('signup')
})

