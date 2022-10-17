const Search = require("../models/search")

app.get('./models/search', async (req, res) => {
    const { foodName } = req.query

    const search = await Search.find({ $text: { $search: foodName }})

    res.render('/searchfood', { search })
})