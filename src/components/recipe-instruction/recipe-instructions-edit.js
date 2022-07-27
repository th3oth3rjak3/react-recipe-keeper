import React, { useState } from "react";
import "./recipe-instruction.css";
import { Stack, Container, Row, Col, Form, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import DeleteModal from "../delete-modal/delete-modal";

export default function RecipeInstructionEdits({
	instructions,
	onInstructionChange,
	removeInstruction,
	addInstruction,
}) {
	const [showModal, setShowModal] = useState(false);
	const [myIndex, setMyIndex] = useState(-1);

	const hideModal = () => setShowModal(false);

	return (
		<Container>
			<Stack gap={3}>
				{instructions.map((instruction, index) => (
					<Row key={index}>
						<Col lg={2}>
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
						<Col>
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
						<Col lg={1}>
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
			</Stack>
			<Button
				type="button"
				className="btn btn-primary mt-3"
				onClick={addInstruction}
			>
				Add Instruction
			</Button>
			<DeleteModal
				showModal={showModal}
				confirmDelete={removeInstruction}
				index={myIndex}
				hideModal={hideModal}
				message={`Are you sure you wish to delete '${instructions[myIndex]?.description}'?`}
				heading={`Delete Step ${instructions[myIndex]?.step}?`}
			/>
		</Container>
	);
}
