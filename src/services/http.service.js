import axios from "axios";

const SERVER_ROOT = "http://127.0.0.1:3001/";
const HEADERS = {
	"Content-Type": "application/json",
	"Access-Control-Allow-Origin": "*",
};

async function getMyRecipes(searchParam = "") {
	let url = SERVER_ROOT + "MyRecipes";
	if (searchParam.length > 0) {
		url += "/" + searchParam;
	}

	let response = await axios
		.get(url, HEADERS)
		.then((res) => res.data)
		.catch((err) => console.error(err));
	return response;
}

async function getRecipeDetails(searchParam) {
	let url = SERVER_ROOT + "GetRecipe/" + searchParam;

	let response = await axios
		.get(url, HEADERS)
		.then((res) => res.data)
		.catch((err) => console.error(err));

	return response;
}

async function addRecipe(data) {
	let url = SERVER_ROOT + "AddRecipe";
	let response = await axios
		.post(url, data, HEADERS)
		.then((res) => res.data)
		.catch((err) => console.error(err));

	return response;
}

async function editRecipe(id, data) {
	let url = SERVER_ROOT + "UpdateRecipe/" + id;
	let response = axios
		.put(url, data, HEADERS)
		.catch((err) => console.error(err));
	return response;
}

async function deleteRecipe(id) {
	let url = SERVER_ROOT + "Delete/" + id;
	await axios.delete(url, HEADERS).catch((err) => console.error(err));
}

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
