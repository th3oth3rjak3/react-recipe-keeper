import React from "react";
import "./app-body.css";
import NavBar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { ClockLoader } from "react-spinners";
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
		<>
			<NavBar></NavBar>
			<Container className="body">
				<React.Suspense
					fallback={
						<ClockLoader
							color={"#36D7B7"}
							cssOverride={{
								display: "block",
								margin: "0 auto",
							}}
						/>
					}
				>
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
				</React.Suspense>
			</Container>
			<Footer></Footer>
		</>
	);
}

export default AppBody;
