import React from "react";
import "./app-body.css";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
const AddRecipe = React.lazy(() => import("../../pages/AddRecipe/AddRecipe"));
const MyRecipes = React.lazy(() => import("../../pages/MyRecipes/MyRecipes"));
const Home = React.lazy(() => import("../../pages/Home/Home"));
const Help = React.lazy(() => import("../../pages/Help/Help"));
const RecipeDetails = React.lazy(() =>
	import("../../pages/RecipeDetails/RecipeDetails")
);
const EditRecipe = React.lazy(() =>
	import("../../pages/EditRecipe/EditRecipe")
);

function AppBody() {
	return (
		<Container className="body">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/MyRecipes" element={<MyRecipes />} />
				<Route path="/MyRecipes/:search" element={<MyRecipes />} />
				<Route
					path="/MyRecipes/RecipeDetails/:id"
					element={<RecipeDetails />}
				/>
				<Route path="/MyRecipes/EditRecipe/:id" element={<EditRecipe />} />
				<Route path="/AddRecipe" element={<AddRecipe />} />
				<Route path="/Help" element={<Help />} />
			</Routes>
		</Container>
	);
}

export default AppBody;
