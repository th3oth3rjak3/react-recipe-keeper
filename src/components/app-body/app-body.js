import React from "react";
import "./app-body.css";
import { Container } from "react-bootstrap";
import { AddRecipe, MyRecipes, Home, Help, RecipeDetails, EditRecipe } from "../../pages";
import { Route, Routes, Outlet } from "react-router-dom";
import NavBar from "../navbar/navbar";
import Footer from "../footer/footer";

function AppBody() {
	return (
		<>
			<NavBar></NavBar>
			<Container className="body">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/MyRecipes" element={<MyRecipes />} />
					<Route path="/MyRecipes/:search" element={<MyRecipes />} />
					<Route path="/MyRecipes/RecipeDetails/:id" element={<RecipeDetails />} />
					<Route path="/MyRecipes/EditRecipe/:id" element={<EditRecipe />}/>
					<Route path="/AddRecipe" element={<AddRecipe />} />
					<Route path="/Help" element={<Help />} />
				</Routes>
				<Outlet />
			</Container>
			<Footer></Footer>
		</>
	);
}

export default AppBody;
