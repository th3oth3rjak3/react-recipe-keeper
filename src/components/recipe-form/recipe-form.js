import React from "react";
import { Accordion, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Tools = React.lazy(() => import("../tools/tools"));
const RecipeHeaderEdit = React.lazy(() =>
	import("../recipe-header/recipe-header-edit")
);
const RecipeIngredientEdit = React.lazy(() =>
	import("../recipe-ingredient/recipe-ingredient-edit")
);
const RecipeInstructionEdits = React.lazy(() =>
	import("../recipe-instruction/recipe-instructions-edit")
);

export default function RecipeForm({
	onFormSubmit,
	validated,
	onHeaderChange,
	header,
	ingredients,
	onIngredientChange,
	removeIngredient,
	addIngredient,
	instructions,
	onInstructionChange,
	addInstruction,
	removeInstruction,
}) {
	const navigate = useNavigate();
	return (
		<div>
			<Form onSubmit={onFormSubmit} validated={validated} noValidate>
				<Accordion defaultActiveKey={""} alwaysOpen="false">
					<Accordion.Item eventKey="0">
						<Accordion.Header>
							{header?.title === "" ? "New Recipe" : header?.title}
						</Accordion.Header>
						<Accordion.Body>
							<RecipeHeaderEdit
								header={header}
								onHeaderChange={onHeaderChange}
							/>
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="1">
						<Accordion.Header>Ingredients</Accordion.Header>
						<Accordion.Body>
							<RecipeIngredientEdit
								ingredients={ingredients}
								onIngredientChange={onIngredientChange}
								removeIngredient={removeIngredient}
								addIngredient={addIngredient}
							/>
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="2">
						<Accordion.Header>Instructions</Accordion.Header>
						<Accordion.Body>
							<RecipeInstructionEdits
								instructions={instructions}
								onInstructionChange={onInstructionChange}
								addInstruction={addInstruction}
								removeInstruction={removeInstruction}
							/>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
				<Button type="submit" className="btn btn-primary mr-3 bottom-button">
					{"Submit"}
				</Button>
				<Button
					type="button"
					className="btn btn-danger m-3 bottom-button"
					onClick={() => {
						navigate(-1);
					}}
				>
					{"Cancel"}
				</Button>
			</Form>
			<Accordion>
				<Accordion.Item eventKey="3">
					<Accordion.Header>Tools</Accordion.Header>
					<Accordion.Body>
						<Tools/>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</div>
	);
}
