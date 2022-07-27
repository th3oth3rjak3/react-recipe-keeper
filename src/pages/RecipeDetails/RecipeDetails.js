import React, { useState, useEffect } from "react";
import "./RecipeDetails.css";
import { getRecipeDetails } from "../../services/http.service";
import { useParams } from "react-router-dom";
import { Accordion, Stack } from "react-bootstrap";
import RecipeHeaderView from "../../components/recipe-header/recipe-header-view";
import RecipeIngredient from "../../components/recipe-ingredient/recipe-ingredient";
import RecipeInstruction from "../../components/recipe-instruction/recipe-instruction";
import { ClockLoader } from "react-spinners";

function RecipeDetails() {
	const { id } = useParams();
	const [recipeData, setRecipeData] = useState([]);
	const [ingredientsRender, setIngredientsRender] = useState([]);
	const [instructionsRender, setInstructionsRender] = useState([]);
	const [recipeRender, setRecipeRender] = useState([]);

	const getRecipe = (params) =>
		getRecipeDetails(params).then((data) => setRecipeData(data));

	useEffect(() => {
		getRecipe(id);
	}, [id]);

	useEffect(() => {
		setInstructionsRender(
			recipeData.map((recipe) => {
			return recipe.instructions.map((instruction, idx) => {
				return (
					<RecipeInstruction
						className="m-3"
						key={idx}
						step={instruction.step}
						description={instruction.description}
					></RecipeInstruction>
				);
			});
		}));
		setIngredientsRender(
			recipeData.map((recipe) => {
				return recipe.ingredients.map((ingredient, idx) => {
					return (
						<RecipeIngredient
							className="m-3"
							key={idx}
							count={ingredient.count}
							volume={ingredient.volume}
							units={ingredient.units}
							container={ingredient.container}
							description={ingredient.description}
						></RecipeIngredient>
					);
				});
			})
		);
	}, [recipeData]);

	useEffect(() => {
		setRecipeRender(
			recipeData.map((recipe, index) => {
				return (
					<div key={index}>
						<Accordion defaultActiveKey={""} alwaysOpen="false">
							<Accordion.Item eventKey="0">
								<Accordion.Header>
									{recipe.header.title}
								</Accordion.Header>
								<Accordion.Body>
									<RecipeHeaderView
										event_key={"0"}
										title={recipe.header.title}
										difficulty={recipe.header.difficulty}
										author={recipe.header.author}
										time_amount={recipe.header.timeAmount}
										time_units={recipe.header.timeUnits}
									></RecipeHeaderView>
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="1">
								<Accordion.Header>
									{"Ingredients"}
								</Accordion.Header>
								<Accordion.Body>
									<Stack gap={3}>
									{ingredientsRender}
									</Stack>
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="2">
								<Accordion.Header>
									{"Instructions"}
								</Accordion.Header>
								<Accordion.Body>
									<Stack gap={3}>
									{instructionsRender}
									</Stack>
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="3">
								<Accordion.Header>
									{"Conversion Tools"}
								</Accordion.Header>
								<Accordion.Body>
									<Stack gap={3}>
									{"Coming soon"}
									</Stack>
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>
					</div>
				);
			})
		);
	}, [recipeData, ingredientsRender, instructionsRender]);

	if (recipeRender.length > 0) {
		return recipeRender;
	} else {
		const cssOverride = {
			display: "block",
			margin: "0 auto",
		};
		return <ClockLoader color={"#36D7B7"} cssOverride={cssOverride} />;
	}
}

export default RecipeDetails;
