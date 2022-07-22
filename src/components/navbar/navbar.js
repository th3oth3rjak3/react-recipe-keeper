import "./navbar.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";

export default class NavBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			error: null,
			recipes: [],
			title: "My Recipes | RecipeKeeper",
		};
	}

	componentDidMount() {
		const preventFormSubmit = () => {
			let myField = document.getElementById("searchInput");
			myField.addEventListener("keypress", (event) => {
				if (event.key === "Enter") {
					event.preventDefault();
					document.getElementById("searchButton").click();
				}
			});
		};
		preventFormSubmit();
	}

	render() {
		const doSearch = async () => {
			let searchParam = await document.getElementById("searchInput")
				.value;
			window.location.href = "/MyRecipes/" + searchParam;
		};
		return (
			<Navbar bg="light" className="navbar" expand="lg">
				<Container fluid>
					<Nav.Link href="/">
						<img
							className="d-inline-block align-top"
							src="/Assets/chef-hat.svg"
							alt="A small chef's hat."
							id="chef-hat"
						></img>
					</Nav.Link>
					<Navbar.Brand href="/">&nbsp;RecipeKeeper</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav
							activeKey={Location.pathname}
							className="me-auto my-2 my-lg-0"
						>
							<Nav.Link
								href="/"
								className={
									window.location.pathname === "/"
										? "active"
										: ""
								}
							>
								Home
							</Nav.Link>
							<Nav.Link
								href="/MyRecipes"
								className={
									window.location.pathname === "/MyRecipes"
										? "active"
										: ""
								}
							>
								My Recipes
							</Nav.Link>
							<Nav.Link
								href="/AddRecipe"
								className={
									window.location.pathname === "/AddRecipe"
										? "active"
										: ""
								}
							>
								Add Recipe
							</Nav.Link>
							<Nav.Link
								href="/Help"
								className={
									window.location.pathname === "/Help"
										? "active"
										: ""
								}
							>
								Help!
							</Nav.Link>
						</Nav>
						<Form className="d-flex">
							<Form.Control
								id="searchInput"
								type="search"
								placeholder="Search"
								className="me-2"
								aria-label="Search"
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
}
