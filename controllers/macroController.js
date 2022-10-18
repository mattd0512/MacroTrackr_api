////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Macro = require("../models/macro")

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// GET request
// index route -> shows all instances of a document in the db
router.get("/", (req, res) => {
    Macro.find({})
        .then(macros => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
   
            res.render('macros/index', { macros, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// GET for new macro
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    res.render('macros/new', { username, loggedIn, userId })
})

// POST request
// create route -> gives the ability to create new macro
router.post("/", (req, res) => {
    req.body.owner = req.session.userId
    console.log('the macro from the form', req.body)
    Macro.create(req.body)
        .then(macro => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            res.redirect('/macros')
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// GET request
router.get('/mine', (req, res) => {
    Macro.find({ owner: req.session.userId })
        .then(macros => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId

            res.render('macros/index', { macros, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// GET request to show the update page
router.get("/edit/:id", (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    const macroId = req.params.id

    Macro.findById(macroId)
        .then(macro => {
            res.render('macros/edit', { macro, username, loggedIn, userId })
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
})

// PUT request
router.put("/:id", (req, res) => {
    console.log("req.body initially", req.body)
    const id = req.params.id

    Macro.findById(id)
        .then(macro => {
            if (macro.owner == req.session.userId) {
                // must return the results of this query
                return macro.updateOne(req.body)
            } else {
                res.sendStatus(401)
            }
        })
        .then(() => {
            res.redirect(`/macros/${id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

router.delete('/:id', (req, res) => {
    const macrosId = req.params.id

    Macro.findByIdAndRemove(MacroId)
        .then(macro => {
            res.redirect('/macros')
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
})

// SHOW request
// read route -> finds and displays a single resource
router.get("/:id", (req, res) => {
    const id = req.params.id

    Macro.findById(id)
        .then(macro => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            res.render('macros/show', { macro, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router