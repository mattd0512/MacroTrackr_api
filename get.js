const fetch = require("node-fetch")

const params = {
	api_key: 'YRV4gHqosbca0GWQjKGaw2H09DAeVRaCLIJfq7UW',
	query: 'chicken breast',
	dataType: ["Survey (FNDDS)"],
	pagesize: 2,
}
const api_url = 
`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}`

function getData() {
	return fetch(api_url)
	.then(response => response.json())
}

getData().then(data => console.log(data.foods[0].foodNutrients[1, 2, 3]))