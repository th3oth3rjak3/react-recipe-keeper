import AppCard from "../../components/app-card/app-card";
import "./Home.css";
import { HelmetProvider, Helmet } from "react-helmet-async";

function Home() {
	const title = "Home | RecipeKeeper";
	return (
		<HelmetProvider>
			<Helmet>
				<title>{title}</title>
			</Helmet>

			<div className="cards">
				<header className="header">
					<h1>RecipeKeeper</h1>
					<h3>Let's Get Cooking!</h3>
				</header>
				<div className="card-holder">
					<AppCard
						className="top-card"
						title="New to RecipeKeeper?"
						subtitle="Click here to learn more"
						color="#eefaa780"
						link="Help"
					></AppCard>
					<div className="bottom-cards">
						<AppCard
							title="My Recipes"
							subtitle="Find, edit, and cook with your saved recipes"
							color="#69faaf80"
							link="MyRecipes"
						></AppCard>
						<AppCard
							title="Add Recipe"
							subtitle="Save a recipe so you can use it again later"
							color="#69faaf80"
							link="AddRecipe"
						></AppCard>
					</div>
				</div>
			</div>
		</HelmetProvider>
	);
}

export default Home;
