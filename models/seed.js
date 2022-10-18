///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Macro = require('./macro')

///////////////////////////////////////
// Seed Script code
///////////////////////////////////////
// first we need our connection saved to a variable for easy reference
const db = mongoose.connection

db.on('open', () => {
    const startMacros = [
        { food: "Chicken Breast", calories: "233", protein: "43g", carbs: "0g", servingSize: "140g" },
        { food: "Salmon", calories: "413", protein: "44g", carbs: "0g", servingSize: "198g" },
        { food: "White Rice", calories: "252", protein: "5g", carbs: "55g", servingSize: "191g" },
        { food: "Ground Turkey", calories: "212", protein: "21g", carbs: "0g", servingSize: "82g" },
        { food: "Egg", calories: "74", protein: "6g", carbs: "0g", servingSize: "50g"},
		{ food: "Tofu", calories: "101", protein: "12g", carbs: "2g", servingSize: "124g"},
        { food: "Potato", calories: "198", protein: "5g", carbs: "45g", servingSize: "213g"},
        { food: "Ground Beef", calories: "312", protein: "31g", carbs: "0g", servingSize: "112g"},
        { food: "Broccoli", calories: "52", protein: "4g", carbs: "11g", servingSize: "148g"},
        { food: "Oats", calories: "151", protein: "5g", carbs: "27g", servingSize: "39g"},

    ]

    Macro.deleteMany({ owner: null })
        .then(deletedMacros => {
            console.log('this is what .deleteMany returns', deletedMacros)

            Macro.create(startMacros)
                .then(data => {
                    console.log('here are the newly created macros', data)
                    // always close connection to the db
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    // always close connection to the db
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            // always close connection to the db
            db.close()
        })
})