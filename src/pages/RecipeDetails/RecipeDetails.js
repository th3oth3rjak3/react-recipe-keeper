import React, { useState, useEffect } from "react";
import "./RecipeDetails.css";
import { getRecipeDetails } from "../../services/http.service";
import { useParams } from "react-router-dom";
import { Accordion, Container, Col, Row } from "react-bootstrap";

function RecipeDetails() {
	const { id } = useParams();
	const [recipeData, setRecipeData] = useState([]);
	const [recipeRender, setRecipeRender] = useState([]);

	const getRecipe = (params) =>
		getRecipeDetails(params).then((data) => setRecipeData(data));

	useEffect(() => {
		getRecipe(id);
	}, [id]);

	useEffect(() => {
		setRecipeRender(
			recipeData.map((recipe, index) => {
			return(<form key={index} action="">
				<Accordion defaultActiveKey={"0"} alwaysOpen="true">
					<Accordion.Item eventKey="0">
						<Accordion.Header>
							{recipe.header.title}
						</Accordion.Header>
						<Accordion.Body>
							<Container>
								<Row>
									<Col>
										<h5 className="underline">
											{"Author"}
										</h5>
										<span>{recipe.header.author}</span>
									</Col>
									<Col>
										<h5 className="underline">
											{"Difficulty"}
										</h5>
										<span>
											{recipe.header.difficulty}
										</span>
									</Col>
									<Col>
										<h5 className="underline">
											{"Time Required"}
										</h5>
										<span>
											{recipe.header.timeAmount +
												" " +
												recipe.header.timeUnits +
												(recipe.header
													.timeAmount === 1
													? ""
													: "s")}
										</span>
									</Col>
								</Row>
							</Container>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</form>);
		}));
	}, [recipeData]);

	if (recipeRender.length > 0) {
		return recipeRender;
	} else {
		return <span>Loading...</span>;
	}
}

export default RecipeDetails;
