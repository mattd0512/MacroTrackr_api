////////////////////
//  Dependencies  //
////////////////////
require("dotenv").config() // make env variables available
const express = require("express")
const path = require("path")
const https = require("https")
const MacroRouter = require('./controllers/macroControllers')
const UserRouter = require('./controllers/userControllers')
const middleware = require('./utils/middleware')


const app = require('liquid-express-views')(express())

// ////////////////////
// //    Routes      //
// ////////////////////

app.get('/', function(req, res) {
  res.send("Server is running")
const options = {
  hostname: 'api.api-ninjas.com',
  // port: 3000,
  path: '/v1/nutrition?query=fries',
  method: 'GET',
  headers: {
    'X-Api-Key': process.env.API_KEY
  },
};

const request = https.request(options, (response) => {

  console.log('statusCode:', response.statusCode);
  console.log('headers:', response.headers);

  response.on('data', (d) => {
    process.stdout.write(d);
  });
});

request.on('error', (e) => {
  console.error(e);
});
request.end();
})


// Register our routes
app.use('/macros', MacroRouter)
app.use('/users', UserRouter)

// app.get('/error', (req, res) => {
//     const { username, loggedIn, userId } = req.session
//     const error = req.query.error || 'This Page Does Not Exist'

// 	res.render('error.liquid', { error, username, loggedIn, userId })
// })

// if page is not found, send to error page
app.all('*', (req, res) => {
	res.redirect('/error')
})



//////////////////////////////
//      App Listener        //
//////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))