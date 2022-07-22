import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

function MyRecipes() {
    const title="My Recipes | RecipeKeeper"
	return (
		<HelmetProvider>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<div>This is the My Recipes page!</div>
		</HelmetProvider>
	);
}

export default MyRecipes;
