import React from "react";
import "./app-body.css";
import { Container } from "react-bootstrap";
import { AddRecipe, MyRecipes, Home, Help } from "../../pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppBody() {
	return (
		<BrowserRouter>
			<Container className="body">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/MyRecipes" element={<MyRecipes />} />
					<Route path="/AddRecipe" element={<AddRecipe />} />
					<Route path="/Help" element={<Help />} />
				</Routes>
			</Container>
		</BrowserRouter>
	);
}

export default AppBody;
