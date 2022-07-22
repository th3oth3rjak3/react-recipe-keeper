import axios from "axios";

const SERVER_ROOT = "http://localhost:3001/";
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
		.catch((err) => console.log(err));
    return response;
}

export { getMyRecipes };
