import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

function AddRecipe() {
	const title = "Add Recipe | RecipeKeeper";
	return (
		<HelmetProvider>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<div>This is the Add Recipe page!</div>
		</HelmetProvider>
	);
}

export default AddRecipe;
