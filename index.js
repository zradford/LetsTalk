const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const app = express()
const login = require('./controllers/loggingin')
const register = require('./controllers/register.js')

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

app.use((req, res, next)=>{
   //set the session up
   next();
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



app.post('/loggingin', /*urlencodedparser,*/ (req, res) => {
   // send the info from the login form to the database for verification
   //instead of req.body
   let data = {
      Username: req.body.Username,
      Password: req.body.Password
   }
   login.login(null, data)
   res.render('user/homepage', {css: '<link rel="stylesheet" href="stylesheets/home.css"'})
})

app.post('/newuser', /*urlencodedparser,*/ (req, res) => {
   let data = {
      first : cleanStr(req.body.first_name),
      last : cleanStr(req.body.last_name),
      email : cleanStr(req.body.email),
      username : cleanStr(req.body.username),
      password : cleanStr(req.body.password[0])
   }

   // I feel like this section will be super slow? would the function call res.render before it is done registering?
   register.register(null, data)
      .then(res.render('user/homepage', {css: '<link rel="stylesheet" href="stylesheets/home.css">'}))
      .catch(e => console.log("throwing error: " + e))
   
})


/**
 * This came from this (specifically user: Johann Echavarria):
 * https://stackoverflow.com/questions/23187013/is-there-a-better-way-to-sanitize-input-with-javascript
 */
function cleanStr(str){
   str = "" + str;
   str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
   return str.trim();
}