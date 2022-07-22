import "./navbar.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";

function NavBar() {
	const [searchVal, setSearchVal] = useState("");

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		doSearch();
	};

	const doSearch = () => {
		navigate("/MyRecipes/" + searchVal);
		setSearchVal("");
	};

	const updateSearch = (e) => {
		setSearchVal(e.target.value);
	};

	return (
		<Navbar bg="light" className="navbar" expand="lg">
			<Container fluid>
				<NavLink className="nav-link" to="/">
					<img
						className="d-inline-block align-top"
						src="/Assets/chef-hat.svg"
						alt="A small chef's hat."
						id="chef-hat"
					></img>
				</NavLink>
				<Link className="navbar-brand" to="/">
					&nbsp;RecipeKeeper
				</Link>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto my-2 my-lg-0">
						<NavLink className={"nav-link"} to="/">
							Home
						</NavLink>
						<NavLink className={"nav-link"} to="/MyRecipes">
							My Recipes
						</NavLink>
						<NavLink className={"nav-link"} to="/AddRecipe">
							Add Recipe
						</NavLink>
						<NavLink className="nav-link" to="/Help">
							Help!
						</NavLink>
					</Nav>
					<Form onSubmit={handleSubmit} className="d-flex">
						<Form.Control
							id="searchInput"
							type="search"
							placeholder="Search Recipes"
							className="me-2"
							aria-label="Search"
							value={searchVal}
							onInput={updateSearch}
						/>
						<Button
							variant="secondary"
							id="searchButton"
							value="Search"
							onClick={doSearch}
						>
							Search
						</Button>
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;
