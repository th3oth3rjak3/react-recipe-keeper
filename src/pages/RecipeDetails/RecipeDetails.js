import React, { useState, useEffect } from "react";
import "./RecipeDetails.css";
import { getRecipeDetails, deleteRecipe } from "../../services/http.service";
import { useParams, useNavigate } from "react-router-dom";
import { Accordion, Stack, Button } from "react-bootstrap";
const RecipeHeaderView = React.lazy(() =>
	import("../../components/recipe-header/recipe-header-view")
);
const RecipeIngredient = React.lazy(() =>
	import("../../components/recipe-ingredient/recipe-ingredient")
);
const RecipeInstruction = React.lazy(() =>
	import("../../components/recipe-instruction/recipe-instruction")
);
const DeleteModal = React.lazy(() =>
	import("../../components/delete-modal/delete-modal")
);
const Tools = React.lazy(() => import("../../components/tools/tools"));

function RecipeDetails() {
	const navigate = useNavigate();
	const { id } = useParams();

	const [recipeData, setRecipeData] = useState("");
	const [showModal, setShowModal] = useState(false);

	const getRecipe = (params) =>
		getRecipeDetails(params).then((data) => setRecipeData(data[0]));

	const handleEdit = () => {
		navigate("/MyRecipes/EditRecipe/" + id, { replace: true });
	};

	const handleDelete = () => {
		deleteRecipe(id).then(() => navigate("/MyRecipes"));
	};

	const displayModal = () => setShowModal(true);

	const hideModal = () => setShowModal(false);

	useEffect(() => {
		getRecipe(id);
	}, [id]);

	//if (recipeData) {
	return (
		<div>
			<Accordion defaultActiveKey={""} alwaysOpen="false">
				<Accordion.Item eventKey="0">
					<Accordion.Header>{recipeData?.header?.title}</Accordion.Header>
					<Accordion.Body>
						<RecipeHeaderView
							event_key={"0"}
							title={recipeData?.header?.title}
							difficulty={recipeData?.header?.difficulty}
							author={recipeData?.header?.author}
							time_amount={recipeData?.header?.timeAmount}
							time_units={recipeData?.header?.timeUnits}
						></RecipeHeaderView>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>{"Ingredients"}</Accordion.Header>
					<Accordion.Body>
						<Stack gap={3}>
							{recipeData?.ingredients?.map((ingredient, idx) => {
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
							})}
						</Stack>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="2">
					<Accordion.Header>{"Instructions"}</Accordion.Header>
					<Accordion.Body>
						<Stack gap={3}>
							{recipeData?.instructions?.map((instruction, idx) => {
								return (
									<RecipeInstruction
										className="m-3"
										key={idx}
										step={instruction.step}
										description={instruction.description}
									></RecipeInstruction>
								);
							})}
						</Stack>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<Button
				type="button"
				className="btn btn-primary mr-3 bottom-button"
				onClick={handleEdit}
			>
				Edit
			</Button>
			<Button
				type="button"
				className="btn btn-danger m-3 bottom-button"
				onClick={displayModal}
			>
				Delete
			</Button>
			<DeleteModal
				showModal={showModal}
				heading={`Delete ${recipeData?.header?.title}?`}
				message={`Are you sure you want to delete ${recipeData?.header?.title}?`}
				hideModal={hideModal}
				confirmDelete={handleDelete}
			></DeleteModal>
			<Accordion className="mt-3">
				<Accordion.Item eventKey="3">
					<Accordion.Header>Tools</Accordion.Header>
					<Accordion.Body>
						<Tools />
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</div>
	);
}

export default RecipeDetails;
