import axios from "axios";
import CLIENT_ENV from "./env.js";

// Clientside environment variables
const env = new CLIENT_ENV();

// Server IP address and port
const SERVER_ROOT = `http://${env.IP_ADDRESS}:${env.PORT}/`;

// Headers for HTTP requests
const HEADERS = {
	"Content-Type": "application/json",
	"Access-Control-Allow-Origin": "*",
	"Accept": "application/json",
};

// Used to get all recipe data for "My Recipes" page. Accounts for search params.
async function getMyRecipes(searchParam = "") {
	let url = SERVER_ROOT + "MyRecipes";
	if (searchParam.length > 0) {
		url += "/" + searchParam;
	}
	let response = await axios
		.post(url, {}, HEADERS)
		.then((res) => res.data)
		.catch((err) => console.error(err));
	return response;
}

// Http function to get details for one recipe
async function getRecipeDetails(searchParam) {
	let url = SERVER_ROOT + "GetRecipe/" + searchParam;
	let response = await axios
		.post(url, {}, HEADERS)
		.then((res) => res.data)
		.catch((err) => console.error(err));

	return response;
}

// Http service to add one recipe to the database
async function addRecipe(data) {
	let url = SERVER_ROOT + "AddRecipe";
	let response = await axios
		.post(url, data, HEADERS)
		.then((res) => res.data)
		.catch((err) => console.error(err));
	return response;
}

// Http service to update a recipe on the database
async function editRecipe(id, data) {
	let url = SERVER_ROOT + "UpdateRecipe/" + id;
	let response = axios
		.put(url, data, HEADERS)
		.catch((err) => console.error(err));
	return response;
}

// Http service to delete a recipe on the database
async function deleteRecipe(id) {
	let url = SERVER_ROOT + "Delete/" + id;
	await axios.delete(url, HEADERS).catch((err) => console.error(err));
}

// Http service to communicate with conversion microservice
async function doConversion(data) {
	let url = SERVER_ROOT + "Conversion";
	let response = await axios
		.post(url, data, HEADERS)
		.then((res) => res.data)
		.catch((err) => console.error(err));
	return response;
}

export {
	getMyRecipes,
	getRecipeDetails,
	addRecipe,
	deleteRecipe,
	editRecipe,
	doConversion,
};
