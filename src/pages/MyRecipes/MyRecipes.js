import React from "react";
import "./MyRecipes.css";
import { getMyRecipes } from "../../services/http.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const RecipeCard = React.lazy(() => import("../../components/recipe-card/recipe-card"));


export default function MyRecipes() {

	// Set title
	document.title = "My Recipes | RecipeKeeper";

	// State variables
	const { search } = useParams();
	const [recipeData, setRecipeData] = useState(null);
	const [recipes, setRecipes] = useState([]);
	//const [loading, setLoading] = useState(false);

	// Local function to get recipe data.
	const getRecipes = (params) => {

		// Use http service and then set state
		getMyRecipes(params).then((data) => {
			setRecipeData(data);
		});
	};

	// Watch for search value changes and get recipes according to the search
	useEffect(() => {
		const param = search ? search : "";

		// Http service to get recipes
		getRecipes(param);
	}, [search]);

	// Wait for data, return array of cards if data returned, else display "no recipes" card
	useEffect(() => {
		if ( !recipeData || recipeData.length === 0) {
			if (recipeData && recipeData.length === 0) {
				setRecipes(
					<RecipeCard
						title={"No Recipes Found"}
						message="It looks like there weren't any results for your search. You can
		try to search again or click here to see all recipes."
						link={"../MyRecipes/"}
					/>
				);
			};
		} else {
			setRecipes(
				recipeData.map((recipe, index) => {
					return (
						<RecipeCard
							key={index}
							link={"../MyRecipes/RecipeDetails/" + recipe._id}
							title={recipe.header.title}
							author={recipe.header.author}
							difficulty={recipe.header.difficulty}
							timeAmount={recipe.header.timeAmount}
							timeUnits={recipe.header.timeUnits}
						></RecipeCard>
					);
				})
			);
		}
	}, [recipeData]);

	// template
	return <>{recipes}</>;
}
