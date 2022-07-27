import React, { useState } from "react";
import "./recipe-ingredient.css";
import { Stack, Container, Row, Col, Form, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import DeleteModal from "../delete-modal/delete-modal";

export default function RecipeIngredientEdit({
	ingredients,
	onIngredientChange,
	removeIngredient,
	addIngredient,
}) {
	const [showModal, setShowModal] = useState(false);
	const [myIndex, setMyIndex] = useState(-1);

	const hideModal = () => setShowModal(false);
	const options = [
		{
			value: "Ounce",
			label: "Ounce",
		},
		{
			value: "Pound",
			label: "Pound",
		},
		{
			value: "Cup",
			label: "Cup",
		},
		{
			value: "Pint",
			label: "Pint",
		},
		{
			value: "Quart",
			label: "Quart",
		},
		{
			value: "Gallon",
			label: "Gallon",
		},
		{
			value: "Teaspoon",
			label: "Teaspoon",
		},
		{
			value: "Tablespoon",
			label: "Tablespoon",
		},
		{
			value: "Milliliter",
			label: "Milliliter",
		},
		{
			value: "Liter",
			label: "Liter",
		},
		{
			value: "Milligram",
			label: "Milligram",
		},
		{
			value: "Gram",
			label: "Gram",
		},
		{
			value: "Kilogram",
			label: "Kilogram",
		},
	];

	return (
		<Container>
			<Stack gap={3}>
				{ingredients.map((ingredient, index) => (
					<Row key={index}>
						<Col lg={2}>
							<FloatingLabel label="Count" className="mb-3">
								<Form.Control
									name="count"
									pattern="[0-9]*"
									onChange={(e) => onIngredientChange(index, e)}
									value={ingredient.count}
									type="text"
									title="Number of items (e.g. 1 for 1 Tomato)"
								></Form.Control>
								<Form.Control.Feedback type="invalid">
								Count must be numeric.
							</Form.Control.Feedback>
							</FloatingLabel>
						</Col>
						<Col lg={2}>
							<FloatingLabel label="Measurement" className="mb-3">
								<Form.Control
									name="volume"
									pattern="[0-9]*"
									onChange={(e) => onIngredientChange(index, e)}
									value={ingredient.volume}
									type="text"
									title="Amount of measurement (e.g. 2 for 2 ounces)"
								></Form.Control>
								<Form.Control.Feedback type="invalid">
								Volume must be numeric.
							</Form.Control.Feedback>
							</FloatingLabel>
						</Col>
						<Col lg={2}>
							<FloatingLabel label="Units" className="mb-3">
								<Form.Select
									name="units"
									onChange={(e) => onIngredientChange(index, e)}
									value={ingredient.units}
									title="Units of measure (e.g. Ounces)"
								>
									<option disabled value="">{" "}</option>
									{options.map((option, index) => (
										<option key={index} value={option.value}>
											{option.label +
												(ingredient.count !== "" || ingredient.volume === "1"
													? ""
													: "s")}
										</option>
									))}
								</Form.Select>
							</FloatingLabel>
						</Col>
						<Col lg={2}>
							<FloatingLabel label="Container" className="mb-3">
								<Form.Control
									name="container"
									onChange={(e) => onIngredientChange(index, e)}
									value={ingredient.container}
									type="text"
									title="The container (e.g. Jar for 1 Jar of Pickles)"
								></Form.Control>
							</FloatingLabel>
						</Col>
						<Col>
							<FloatingLabel label="Ingredient" className="mb-3">
								<Form.Control
									name="description"
									value={ingredient.description}
									onChange={(e) => onIngredientChange(index, e)}
									type="text"
									title="The Ingredient (e.g. Pickles)"
								></Form.Control>
							</FloatingLabel>
						</Col>
						<Col lg={1}>
							<Button
								type="button"
								className="btn btn-danger delete-instruction"
								onClick={(e) => {
									setMyIndex(index);
									setShowModal(true);
								}}
								disabled={ingredients.length === 1}
							>
								{"Delete"}
							</Button>
						</Col>
					</Row>
				))}
			</Stack>
			<Button
				type="button"
				className="btn btn-primary mt-3"
				onClick={addIngredient}
			>
				Add Ingredient
			</Button>
			<DeleteModal
				showModal={showModal}
				confirmDelete={removeIngredient}
				index={myIndex}
				hideModal={hideModal}
				message={`Are you sure you wish to delete '${ingredients[myIndex]?.description}'?`}
				heading={"Delete Ingredient?"}
			/>
		</Container>
	);
}
