/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express

const path = require("path") // import path module
const MacroRouter = require('./controllers/macroController')
const UserRouter = require('./controllers/user')
const middleware = require('./utils/middleware')

/////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////
// const app = express()
const app = require('liquid-express-views')(express())

/////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////

middleware(app)

/////////////////////////////////////////////
// Home Route
/////////////////////////////////////////////
app.get("/", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/macros')
    } else {
        res.render('index.liquid')
    }
})

/////////////////////////////////////////////
// Register our Routes
/////////////////////////////////////////////
app.use('/users', UserRouter)
app.use('/macros', MacroRouter)

// this renders an error page, gets the error from a url request query
app.get('/error', (req, res) => {
    // get session variables
    const { username, loggedIn, userId } = req.session
    const error = req.query.error || 'This page does not exist'

    res.render('error.liquid', { error, username, loggedIn, userId })
})

// this is a catchall route, that will redirect to the error page for anything that doesn't satisfy a controller
app.all('*', (req, res) => {
    res.redirect('/error')
})

/////////////////////////////////////////////
// Server Listener
/////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))

// END