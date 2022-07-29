import React, { useState } from "react";
import "./recipe-instruction.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
const DeleteModal = React.lazy(() => import("../delete-modal/delete-modal"));

export default function RecipeInstructionEdits({
	instructions,
	onInstructionChange,
	removeInstruction,
	addInstruction,
}) {

	// State variables
	const [showModal, setShowModal] = useState(false);
	const [myIndex, setMyIndex] = useState(-1);

	// Handler to hide the modal
	const hideModal = () => setShowModal(false);

	// Template
	return (
		<Container>
				{instructions?.map((instruction, index) => (
					<Row className="m-3" key={index}>
						<Col xl={2}>
							<FloatingLabel label="Step" className="mb-3">
								<Form.Control
									name="step"
									onChange={(e) => onInstructionChange(index, e)}
									value={instruction.step}
									type="text"
									title="The step number of the instructions. (e.g. Step 1)"
									disabled
								></Form.Control>
							</FloatingLabel>
						</Col>
						<Col xl>
							<FloatingLabel label="Instruction" className="mb-3">
								<Form.Control
									name="description"
									value={instruction.description}
									onChange={(e) => onInstructionChange(index, e)}
									type="text"
									title="The instruction details. (e.g. Preheat Oven)"
								></Form.Control>
							</FloatingLabel>
						</Col>
						<Col xl={1}>
							<Button
								type="button"
								className="btn btn-danger delete-instruction"
								onClick={(e) => {
									setMyIndex(index);
									setShowModal(true);
								}}
								disabled={instructions.length === 1}
							>
								Delete
							</Button>
						</Col>
					</Row>
				))}
			<Row className="m-3">
				<Col xl>
					<Button
						type="button"
						className="btn btn-primary add-instruction"
						onClick={addInstruction}
					>
						Add Instruction
					</Button>
				</Col>
			</Row>
			<DeleteModal
				showModal={showModal}
				confirmDelete={removeInstruction}
				index={myIndex}
				hideModal={hideModal}
				message={`Are you sure you wish to delete '${instructions ? instructions[myIndex]?.description : ""}'?`}
				heading={`Delete Step ${instructions ? instructions[myIndex]?.step : ""}?`}
			/>
		</Container>
	);
}
