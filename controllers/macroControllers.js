// // Import Dependencies
const express = require('express')
const Macro = require('../models/macro')


// // Create router
const router = express.Router()

// // // Router Middleware
// // // Authorization middleware
// // // If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
// // // 

// Routes

// router.get('/', function(req, res) {
//     const options = {
//       hostname: 'api.api-ninjas.com',
//       // port: 3000,
//       path: '/v1/nutrition?query=fries',
//       method: 'GET',
//       headers: {
//         'X-Api-Key': process.env.api_key
//       },
//     };
    
//     const request = https.request(options, (response) => {
    
//       console.log('statusCode:', response.statusCode);
//       console.log('headers:', response.headers);
    
//       response.on('data', (d) => {
//         process.stdout.write(d);
//       });
//     });
    
//     request.on('error', (e) => {
//       console.error(e);
//     });
//     request.end();
// })

// GET request
// index route -> shows all instances of a document in the db
router.get("/", (req, res) => {
    // console.log("this is the request", req)
    // in our index route, we want to use mongoose model methods to get our data
    Macro.find({})
        .populate("username")
        .then(macros => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            // this is fine for initial testing
            // res.send(fruits)
            // this the preferred method for APIs
            // res.json({ macros: macros })
            res.render('macros/index', { macros, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// GET for new fruit
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    res.render('macros/new', { username, loggedIn, userId })
})

// GET request
// only fruits owned by logged in user
// we're going to build another route, that is owner specific, to list all the fruits owned by a certain(logged in) user
router.get('/mine', (req, res) => {
    // find the fruits, by ownership
    Macro.find({ owner: req.session.userId })
    // then display the fruits
        .then(macros => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId

            // res.status(200).json({ fruits: fruits })
            res.render('macros/index', { fruits, username, loggedIn, userId })
        })
    // or throw an error if there is one
        .catch(err => res.redirect(`/error?error=${err}`))
})

// GET request to show the update page
router.get("/edit/:id", (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    const macroId = req.params.id

    Macro.findById(MacroId)
        // render the edit form if there is a fruit
        .then(macro => {
            res.render('macros/edit', { macro, username, loggedIn, userId })
        })
        // redirect if there isn't
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
    // res.send('edit page')
})

// PUT request
// update route -> updates a specific fruit
// router.put("/:id", (req, res) => {
//     console.log("req.body initially", req.body)
//     const id = req.params.id

//     req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
//     console.log('req.body after changing checkbox value', req.body)
//     Fruit.findById(id)
//         .then(fruit => {
//             if (fruit.owner == req.session.userId) {
//                 // must return the results of this query
//                 return fruit.updateOne(req.body)
//             } else {
//                 res.sendStatus(401)
//             }
//         })
//         .then(() => {
//             // console.log('returned from update promise', data)
//             res.redirect(`/fruits/${id}`)
//         })
//         .catch(err => res.redirect(`/error?error=${err}`))
// })

router.delete('/:id', (req, res) => {
    // get the fruit id
    const fruitId = req.params.id

    // delete and REDIRECT
    Fruit.findByIdAndRemove(fruitId)
        .then(fruit => {
            // if the delete is successful, send the user back to the index page
            res.redirect('/fruits')
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
})

// SHOW request
// read route -> finds and displays a single resource
router.get("/:id", (req, res) => {
    const id = req.params.id

    Fruit.findById(id)
        // populate will provide more data about the document that is in the specified collection
        // the first arg is the field to populate
        // the second can specify which parts to keep or which to remove
        // .populate("owner", "username")
        // we can also populate fields of our subdocuments
        .populate("comments.author", "username")
        .then(fruit => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            // res.json({ fruit: fruit })
            res.render('fruits/show', { fruit, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


// Export the Router
module.exports = router

