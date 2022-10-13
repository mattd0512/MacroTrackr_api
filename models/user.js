// // import what I need
const mongoose = require("mongoose")

const { Schema, model } = mongoose
// // create the schema
const userSchema = new Schema(
	{
		username: { 
			type: String, 
			required: true, 
			unique: true 
		},
		password: { 
			type: String, 
			required: true 
		}
	},
	{ timestamps: true }
)

// // creat the model
const User = model("User", userSchema)

// // export the model
module.exports = User
