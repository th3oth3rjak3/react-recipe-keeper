import { getMyRecipes } from "../../services/http.service";
import RecipeCard from "../../components/recipe-card/recipe-card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MyRecipes() {
	document.title = "My Recipes | RecipeKeeper";
	const { search } = useParams();

	const [recipeData, setRecipeData] = useState([]);
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		const param = search ? search : "";
		getRecipes(param);
	}, [search]);

	useEffect(() => {
		setRecipes(
			recipeData.map((recipe, id) => {
				return (
					<RecipeCard
						key={id}
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
	}, [recipeData]);

	const getRecipes = (params) =>
		getMyRecipes(params).then((data) => setRecipeData(data));

	if (recipeData.length > 0) {
		return <>{recipes}</>;
	} else {
		return (
			<RecipeCard
				title={"No Recipes Found"}
				message="It looks like there weren't any results for your search. You can
			try to search again or click here to see all recipes."
				link={"../MyRecipes/"}
			/>
		);
	}
}
