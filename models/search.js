const mongoose = require('mongoose')

const searchSchema = new Schema ({
    name: {
        type: String,
    },
    serving: {
        size: String
    }
})

const Search = model("Search", searchSchema)

module.exports = Search