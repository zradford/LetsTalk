const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const app = express()
const login = require('./controllers/loggingin')

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

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


// routes
app.get("/", (req, res) =>{
   res.render('index')
})

app.get('/login', (req, res) => {
   res.render('login')
})

app.get('/signup', (req, res) => {
   res.render('signup')
})

app.post('/loggingin', urlencodedparser, (req, res) => {
   // send the info from the login form to the database for verification
   //instead of req.body
   let data = {
      username: "hello",
      password: "world"
   }


   login.login(NULL, data)
   // res.render('homepage')
})

app.post('/newuser', urlencodedparser, (req, res) => {
   // send info to controller for verification

   // set the user as signed in

   // render('homepage')
})
