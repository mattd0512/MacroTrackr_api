// make our .env variables available via process.env
require('dotenv').config()
const mongoose = require('mongoose')

// connect to the database
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useUnifiedTopology: true,
	useNewUrlParser: true
}

// save the connection in a variable
mongoose.connect(DATABASE_URL, CONFIG)

// tell mongoose what to do with certain events
// opens, disconnects, errors
mongoose.connection
    .on("open", () => console.log("Connected to Mongoose"))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.log("An error occurred: \n", error))

// // export the connection
module.exports = mongoose
