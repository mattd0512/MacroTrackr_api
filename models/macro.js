///////////////////////////////////////////////////////////
// Our schema and model for the fruit resource
///////////////////////////////////////////////////////////
// this is the old mongoose import
// const mongoose = require("mongoose") // import mongoose
const mongoose = require('./connection')
const User = require('./user')// unused import


// we're going to pull the Schema and model from mongoose
// we'll use a syntax called "destructuring"
const { Schema, model } = mongoose

// fruits schema
const macroSchema = new Schema({ // capitalize our model schema - it is a class and we always capitalize classes in JS
    food: String,
    calories: String,
    protein: String,
    carbs: String,
    servingSize: String,
    owner: {
        // here we can refer to an objectId
        // by declaring that as the type
        type: Schema.Types.ObjectId,
        // this line, tells us to refer to the User model
        ref: 'User'
    },// we don't have comments brought in and implemented at our model level here yet- should be an array with the imported comment schema inside 
}, { timestamps: true })

// make the fruit model
// the model method takes two args
// the first is what we will call our model
// the second is what we will use to build the model
const Macro = model("Macro", macroSchema)

//////////////////////////////////////////////////
// Export our model
//////////////////////////////////////////////////
module.exports = Macro