const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/RecipeKeeper");

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

const Recipe = mongoose.model("Recipe", recipeSchema);

app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/AddRecipe", (req, res) => {
    console.log(req.body);
    let newRecipe = new Recipe(req.body);
    let recipeResponse = {id: "", msg: ""};
    newRecipe
        .save()
        .then(() => {
            recipeResponse.id = newRecipe.id;
            console.log(newRecipe.id);
            recipeResponse.msg = "Item saved to database successfully.";
            res.json(recipeResponse).send();
        })
        .catch(() => {
            recipeResponse.id = "";
            recipeResponse.msg = "Cannot save to the database.";
            res.status(400).json(recipeResponse).send();
        });
});

app.get("/GetRecipe/:id", (req, res) => {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `No recipe with id :${id}` });
    } else {
        let filter = [];
        filter.push({ _id: id });
        const findRecipe = async (filter) => {
            const query = Recipe.find();
            if (filter.length > 0) {
                query.and(filter);
            }
            return query.exec();
        };

        findRecipe(filter)
            .then((recipe) => {
                res.status(200).json(recipe);
            })
            .catch((error) => {
                res.status(500).json({ Error: error });
            })
            .finally(() => {
            });
    }
});

app.put("/UpdateRecipe/:id", (req, res) => {
    const updateRecipe = async (
        _id,
        header,
        ingredients,
        instructions
    ) => {
        const recipe = await Recipe.findById(_id);

        if (header === undefined) {
            header = recipe.header;
        }
        if (ingredients === undefined) {
            ingredients = recipe.ingredients;
        }
        if (instructions === undefined) {
            instructions = recipe.instructions;
        }

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

app.get("/MyRecipes", (req, res) => {
    const searchRecipes = async (filter) => {
        const query = Recipe.find(filter).sort({
            "header.title": "asc",
        });
        return query.exec();
    };

    let params = {
        "header.title": {
            $regex: ".*.*",
            $options: "i",
        },
    };

    searchRecipes(params).then((recipes) => {
        //console.log(recipes);
        res.status(200).json(recipes);
    });
});

app.get("/MyRecipes/:search_val", (req, res) => {
    let search = req.params.search_val;
    if (!search) {
        search = "";
    }
    const searchRecipes = async (filter) => {
        const query = Recipe.find(filter).sort({
            "header.title": "asc",
        });
        return query.exec();
    };

    let params = {
        "header.title": {
            $regex: ".*" + search + ".*",
            $options: "i",
        },
    };

    searchRecipes(params).then((recipes) => {
        res.status(200).json(recipes);
    });
});

app.delete("/Delete/:_id", (req, res) => {
    const deleteById = async (id) => {
        const result = await Recipe.deleteOne({ _id: id });
        return result.deletedCount;
    };
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

app.post("/Conversion", (req, res) => {
    if (req.body){
        const conversion = req.body;
        conversion.amountTo = "updated";
        res.status(200).json(conversion);
    } else {
        res.status(400).send("Improperly formatted request");
    }
    
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
