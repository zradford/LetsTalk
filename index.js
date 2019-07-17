const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session');
const hbs = require('express-handlebars')
const login = require('./controllers/loggingin')
const register = require('./controllers/register.js')
const passport = require('passport')

if(process.env.NODE_ENV != "production"){
   require('./secrets/secrets.js')
}

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(session({
   secret: 'process.env.SESSION_SECRET',
   resave: false,
   saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

passport.deserializeUser((id, done) => {
  return User.findById(id)
    .then(user => {
      done(null, user)
      return null
    })
    .catch(err => done(err))
})

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
   if(req.session.loggedin) {
      res.render('/homepage')
   } else { res.render('index')}
})

app.get('/login', (req, res) => {
   res.render('login')
})

app.get('/signup', (req, res) => {
   res.render('signup')
})

app.get('/homepage', (req, res) => {
   req.session.loggedin = true;
   console.log(req.session)
   res.render('user/homepage')
})

app.get('/logout', (req,res)=>{
   req.session.loggedin = false;
   res.render('index')
})


app.post('/loggingin', /*urlencodedparser,*/ (req, res) => {

   if(req.body.username != null && req.body.password != null) {
      let data = {
         username: req.body.username,
         password: req.body.password
      }

      login.login(null, data)
         .then((isValidated) => {
            if(isValidated){
               res.redirect('/homepage')
            } else {
               res.redirect('/login')
            }
         })
   } else login.login({err : "Please fill in both fields"})

})

app.post('/newuser', /*urlencodedparser,*/ (req, res) => {
   let data = {
      first : cleanStr(req.body.first_name),
      last : cleanStr(req.body.last_name),
      email : cleanStr(req.body.email),
      username : cleanStr(req.body.username),
      password : cleanStr(req.body.password[0])
   }
   console.log("going to register.js: register()")
   register.register(null, data)
   res.redirect('user/homepage');
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