import React from "react";
import "./recipe-header-view.css";
import { Form, Col, Row, Container, Stack } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export default function RecipeHeaderEdit({ header, onHeaderChange }) {
	const options = [
		{
			value: "Hour",
			label: "Hour",
		},
		{
			value: "Minute",
			label: "Minute",
		},
		{
			value: "Second",
			label: "Second",
		},
	];

	return (
		<Container fluid>
			<Stack gap={3}>
				<Row className="m-3">
					<Col xl>
						<FloatingLabel
							label="Recipe Title"
							className="mb-3"
							controlId="recipeTitle"
						>
							<Form.Control
								type="text"
								name="title"
								title="The title of the recipe."
								value={header?.title}
								onChange={(e) => onHeaderChange(e)}
								required
							/>
							<Form.Control.Feedback type="invalid">
								Recipe Title cannot be blank.
							</Form.Control.Feedback>
						</FloatingLabel>
					</Col>
					<Col xl>
						<FloatingLabel
							label="Author"
							className="mb-3"
							controlId="recipeAuthor"
						>
							<Form.Control
								type="text"
								name="author"
								title="The author who created this recipe."
								value={header?.author}
								onChange={(e) => onHeaderChange(e)}
								required
							/>
							<Form.Control.Feedback type="invalid">
								Author cannot be blank.
							</Form.Control.Feedback>
						</FloatingLabel>
					</Col>
					<Col xl>
						<FloatingLabel
							label="Difficulty"
							className="mb-3"
							controlId="difficulty"
						>
							<Form.Select
								name="difficulty"
								value={header?.difficulty}
								onChange={(e) => {
									onHeaderChange(e);
								}}
								title="The difficulty level for making this recipe."
								required
							>
								<option disabled value="">
									{""}
								</option>
								<option value="Easy">Easy</option>
								<option value="Medium">Medium</option>
								<option value="Hard">Hard</option>
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								Difficulty cannot be blank.
							</Form.Control.Feedback>
						</FloatingLabel>
					</Col>
					<Col xl>
						<FloatingLabel
							label="Time Amount"
							className="mb-3"
							controlId="timeAmount"
						>
							<Form.Control
								type="text"
								title="The amount of time to make the recipe. (e.g. 20 in '20 Minutes')"
								name="timeAmount"
								pattern="[0-9]+"
								value={header?.timeAmount}
								onChange={(e) => {
									onHeaderChange(e);
								}}
								required
							></Form.Control>
							<Form.Control.Feedback type="invalid">
								Time Amount cannot be blank and must be numeric.
							</Form.Control.Feedback>
						</FloatingLabel>
					</Col>
					<Col xl>
						<FloatingLabel label="Time Units">
							<Form.Select
								title="The units of time to make the recipe. (e.g. Minutes in '20 Minutes')"
								name="timeUnits"
								value={header?.timeUnits}
								onChange={(e) => {
									onHeaderChange(e);
								}}
								required
							>
								<option disabled value=""></option>
								{options?.map((option, index) => (
									<option key={index} value={option.value}>
										{option.label + (header?.timeAmount === "1" ? "" : "s")}
									</option>
								))}
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								Time Units cannot be blank.
							</Form.Control.Feedback>
						</FloatingLabel>
					</Col>
				</Row>
			</Stack>
		</Container>
	);
}
