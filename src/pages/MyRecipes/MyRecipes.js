import { getMyRecipes } from "../../services/http.service";
import RecipeCard from "../../components/recipe-card/recipe-card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	CircleLoader,
	ClimbingBoxLoader,
	BarLoader,
	ClockLoader,
	PacmanLoader,
} from "react-spinners";
//import "./MyRecipes.css";

export default function MyRecipes() {
	document.title = "My Recipes | RecipeKeeper";
	const { search } = useParams();

	const [recipeData, setRecipeData] = useState(null);
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const param = search ? search : "";
		getRecipes(param);
	}, [search]);

	useEffect(() => {
		if (loading || !recipeData || recipeData.length === 0) {
			if (!recipeData) {
				setLoading(true);
			}
			if (recipeData && recipeData.length === 0) {
				setRecipes(
					<RecipeCard
						title={"No Recipes Found"}
						message="It looks like there weren't any results for your search. You can
		try to search again or click here to see all recipes."
						link={"../MyRecipes/"}
					/>
				);
				setLoading(false);
			}
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
	}, [recipeData, loading]);

	const getRecipes = (params) => {
		setLoading(true);
		getMyRecipes(params).then((data) => {
			setLoading(false);
			setRecipeData(data);
		});
	};

	const cssOverride = {
		display: "block",
		margin: "0 auto",
	};

	return (
		<>
			{loading ? (
				<ClockLoader color={"#36D7B7"} cssOverride={cssOverride} />
			) : (
				recipes
			)}
		</>
	);
}
