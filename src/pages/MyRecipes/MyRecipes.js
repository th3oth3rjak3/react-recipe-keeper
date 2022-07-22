import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { getMyRecipes } from "../../services/http.service";
import RecipeCard from "../../components/recipe-card/recipe-card";

export default class MyRecipes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			error: null,
			recipes: [],
			title: "My Recipes | RecipeKeeper",
		};
	}

	async componentDidMount() {
		const callback = (val) => {
			this.setState({ recipes: val });
			this.setState({ isLoading: false });
		};
		let params = window.location.pathname
			.split("/")
			.filter((val) => val !== "");
		if (params.length > 1) {
			params = params[1];
		} else {
			params = "";
		}
		await getMyRecipes(params).then((res) => callback(res));
	}
	render() {
		const recipes = this.state.recipes.map((recipe, id) => {
			return (
				<RecipeCard
					key={id}
					link={"/RecipeDetails/" + recipe._id}
					title={recipe.header.title}
					author={recipe.header.author}
					difficulty={recipe.header.difficulty}
					timeAmount={recipe.header.timeAmount}
					timeUnits={recipe.header.timeUnits}
				></RecipeCard>
			);
		});
		if (!this.state.isLoading && this.state.recipes.length > 0) {
			console.log(this.state.recipes);
			return (
				<HelmetProvider>
					<Helmet>
						<title>{this.state.title}</title>
					</Helmet>
					{recipes}
				</HelmetProvider>
			);
		} else if (!this.state.isLoading) {
			return (
				<HelmetProvider>
					<Helmet>
						<title>{this.state.title}</title>
					</Helmet>
					<RecipeCard title="No Recipes Found" link="">
						It looks like there weren't any results for your search.
						You can try to search again or click here to see all
						recipes.
					</RecipeCard>
				</HelmetProvider>
			);
		}
	}
}
