// import dependencies
const mongoose = require('./connection')
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

// make macro schema
const macroSchema = new Schema({
  name: String,
  calories: String,
  protein_g: String,
  carbohydrates_total_g: String
})

const Macro = model('Macro', macroSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Macro
