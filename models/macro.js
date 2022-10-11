// import dependencies
const mongoose = require('./connection')


// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

// make macro schema
const macrosSchema = new Schema({
  food: String,
  calories: String,
  protein: String,
})

const Macro = model('Macro', macrosSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Macro
