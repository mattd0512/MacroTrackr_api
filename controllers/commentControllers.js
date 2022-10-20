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
// POST
// only loggedIn users can post comments
router.post("/:macroId", (req, res) => {
    const macroId = req.params.macroId

    if (req.session.loggedIn) {
        // we want to adjust req.body so that the author is automatically assigned
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    // find a specific fruit // what fruit
    Macro.findById(macroId)
        // do something if it works
        //  --> send a success response status and maybe the comment? maybe the fruit?
        .then(macro => {
            // push the comment into the fruit.comments array
            macro.comments.push(req.body)// non of your macros have comment arrays, see model
            // we need to save the fruit
            return macro.save()
        })
        .then(macro => {
            // res.status(200).json({ fruit: fruit })
            res.redirect(`/macros/${macro.id}`)
        })
        // do something else if it doesn't work
        //  --> send some kind of error depending on what went wrong
        .catch(err => res.redirect(`/error?error=${err}`))
})
// no update ?
// DELETE
// only the author of the comment can delete it
router.delete('/delete/:macroId/:commId', (req, res) => {
    // isolate the ids and save to vars for easy ref
    const macroId = req.params.macroId 
    const commId = req.params.commId
    // get the fruit
    Macro.findById(macroId)
        .then(macro => {
            // get the comment
            // subdocs have a built in method that you can use to access specific subdocuments when you need to.
            // this built in method is called .id()
            const theComment = macro.comments.id(commId)
            console.log('this is the comment that was found', theComment)
            // make sure the user is logged in
            if (req.session.loggedIn) { // combine these blocks with an && since they return the same error
                // only let the author of the comment delete it
                if (theComment.author == req.session.userId) {
                    // find some way to remove the comment
                    // here's another built in method
                    theComment.remove()
                    macro.save()
                    res.redirect(`/macros/${macro.id}`)
                    // return the saved fruit
                    // return fruit.save()
                } else {
                    const err = 'you%20are%20not%20authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                }
            } else {
                const err = 'you%20are%20not%20authorized%20for%20this%20action'
                res.redirect(`/error?error=${err}`)
            }
        })
        // send an error if error
        .catch(err => res.redirect(`/error?error=${err}`))

})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router