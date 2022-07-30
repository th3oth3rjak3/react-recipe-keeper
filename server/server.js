const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");

// Local instance of MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/RecipeKeeper");

// Define mongoose schema for MongoDB
let recipeSchema = new mongoose.Schema({
	header: {
		title: String,
		author: String,
		difficulty: String,
		timeAmount: String,
		timeUnits: String,
	},
	ingredients: [
		{
			count: String,
			volume: String,
			units: String,
			container: String,
			description: String,
		},
	],
	instructions: [
		{
			step: String,
			description: String,
		},
	],
});

// Define a Recipe Object
const Recipe = mongoose.model("Recipe", recipeSchema);

// CORS because sometimes the browser gets angry.
app.use(cors());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	next();
});

// Use express features
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for adding a recipe
app.post("/AddRecipe", (req, res) => {
	// Add the new recipe to the database
	let newRecipe = new Recipe(req.body);
	let recipeResponse = { id: "", msg: "" };
	newRecipe
		.save()
		.then(() => {
			recipeResponse.id = newRecipe.id;
			// Send response back to client
			recipeResponse.msg = "Item saved to database successfully.";
			res.json(recipeResponse).send();
		})
		.catch(() => {
			recipeResponse.id = "";
			recipeResponse.msg = "Cannot save to the database.";
			res.status(400).json(recipeResponse).send();
		});
});

// Route for getting an individual recipe details
app.get("/GetRecipe/:id", (req, res) => {
	// Local function to find one recipe from the database
	const findRecipe = async (filter) => {
		const query = Recipe.find();
		if (filter.length > 0) {
			query.and(filter);
		}
		return query.exec();
	};

	// Get the id from the URL and check to see if it's valid
	let id = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ msg: `No recipe with id :${id}` });
	} else {
		// If valid, then filter the database for the resulting recipe
		let filter = [{ _id: id }];

		// Find the recipe
		findRecipe(filter)
			.then((recipe) => {
				// Return the recipe to the client
				res.status(200).json(recipe);
			})
			.catch((error) => {
				res.status(500).json({ Error: error });
			});
	}
});

// Route to update a recipe
app.put("/UpdateRecipe/:id", (req, res) => {
	// Local function to update a recipe
	const updateRecipe = async (_id, header, ingredients, instructions) => {
		// Find the recipe by ID from the database.
		const recipe = await Recipe.findById(_id);

		// If no updated header was provided, use the old one
		if (header === undefined) {
			header = recipe.header;
		}

		// If no updated ingredients were provided, use the old ones
		if (ingredients === undefined) {
			ingredients = recipe.ingredients;
		}

		// If no updated instructions were provided, use the old ones
		if (instructions === undefined) {
			instructions = recipe.instructions;
		}

		// Finally replace the old recipe object with the new object
		const result = await Recipe.replaceOne(
			{ _id: _id },
			{
				header: header,
				ingredients: ingredients,
				instructions: instructions,
			}
		);
		return result.modifiedCount;
	};

	// Call the local update function, provide request body objects.
	updateRecipe(
		req.params.id,
		req.body.header,
		req.body.ingredients,
		req.body.instructions
	)
		.then((updateCount) => {
			if (updateCount === 1) {
				res.json({
					id: req.params._id,
				});
			} else {
				res.status(404).json({ Error: "Resource not found." });
			}
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ Error: error });
		});
});

// Return all recipe results
app.get("/MyRecipes", (req, res) => {
	// Local search function
	const searchRecipes = async (filter) => {
		// Sort recipes by title A-Z
		const query = Recipe.find(filter).sort({
			"header.title": "asc",
		});
		return query.exec();
	};

	// Define search criteria for all recipes
	let params = {
		"header.title": {
			$regex: ".*.*",
			$options: "i",
		},
	};

	// Find and return all recipes
	searchRecipes(params).then((recipes) => {
		// Send recipe data back to client.
		res.status(200).json(recipes);
	});
});

// Route for when a user performs a navbar search
app.get("/MyRecipes/:search_val", (req, res) => {
	// Local search function to filter database results
	const searchRecipes = async (filter) => {
		const query = Recipe.find(filter).sort({
			"header.title": "asc",
		});
		return query.exec();
	};

	// Check for search params, set to empty string if "/" provided on the route.
	let search = req.params.search_val;
	if (!search) {
		search = "";
	}

	// Use regular expressions to filter to search criteria
	let params = {
		"header.title": {
			$regex: ".*" + search + ".*",
			$options: "i",
		},
	};

	// Get results and return to client.
	searchRecipes(params).then((recipes) => {
		res.status(200).json(recipes);
	});
});

// Delete route for removing objects from the database
app.delete("/Delete/:_id", (req, res) => {
	// Local function to delte by an ID from the database
	const deleteById = async (id) => {
		const result = await Recipe.deleteOne({ _id: id });
		return result.deletedCount;
	};

	// Delete the recipe object from the database and send the response.
	deleteById(req.params._id)
		.then((deletedCount) => {
			if (deletedCount === 1) {
				res.status(204).send();
			} else {
				res.status(404).json({ Error: "Resource Not Found" });
			}
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ Error: error });
		});
});

// Route web traffic through server to microservice
app.post("/Conversion", (req, res) => {
	if (req.body) {
		const data = req.body;
		axios
			.post("http://192.168.86.22:3002/Conversion", data)
			.then((response) => {
				res.status(200).send(response.data);
			});
	} else {
		res.status(400).send("Improperly formatted request");
	}
});

// Open application for listening on the specified port.
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
