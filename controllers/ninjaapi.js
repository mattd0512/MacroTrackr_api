// // Import Dependencies
// const express = require('express')
// const axios = require('axios')
// require("dotenv").config() // make env variables available
// // Create router
// const router = express.Router()
// // Routes
// // index ALL
// router.get('/', (req, res) => {
//     axios.get(`https://api.api-ninjas.com/v1/nutrition?query=${process.env.API_KEY}`)
//         .then(apiRes => {
//             console.log(apiRes.data.DailyForecasts[0].Temperature)
//             //declaring park so i do not have to 'drill' as deep
//             const weather = apiRes.data.DailyForecasts
//             //console.log('this is the park index', park)
//             //rendering(showing all the parks from API)
//             res.render('layout.liquid', { weather })
//         })
//         .catch(err=>{
//             console.error('Error:', err)
//             res.json(err)
//         })
// })
// module.exports = router
