const db = require('../models/database')


function register(err, response) {
   if(err) response.render('signup', {css : "<link rel='stylesheet' type='text/css' href='error.css'>"}) 

}

module.exports = {
   register : register
}