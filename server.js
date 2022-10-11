////////////////////
//  Dependencies  //
////////////////////
require("dotenv").config() // make env variables available
const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const path = require("path")
const Macro = require("./models/macro")

// const middleware = require('./utils/middleware')
// const MacroRouter = require('./controllers/macroControllers')
// const UserRouter = require('./controllers/userControllers')
// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error))


const app = express()
//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
app.use(morgan("tiny"))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(express.json())

////////////////////
//    Routes      //
////////////////////

app.get('/', (req, res) => {
   res.send('Ok ok I see you!')
})


// app.use('/users', UserRouter)
// app.use('/macros', MacroRouter)

// app.get('/error', (req, res) => {
// 	const error = req.query.error || 'This Page Does Not Exist'
//     const { username, loggedIn, userId } = req.session
// 	res.render('error.liquid', { error, username, loggedIn, userId })
// })

// if page is not found, send to error page
// app.all('*', (req, res) => {
// 	res.redirect('/error')
// })



//////////////////////////////
//      App Listener        //
//////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`You are now connected to port: ${PORT}`))