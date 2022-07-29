import React, { useState } from "react";
import "./recipe-instruction.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ImCheckmark, ImCross } from "react-icons/im";

export default function RecipeInstruction({ step, description }) {
	
	// Local variables
	const _step = step ? step + ". " : "";
	const _description = description ? description : "";

	// Filter for non-null values and then join them with a space.
	const display_value = [_step, _description].filter(Boolean).join(" ");

	// State variables
	const [isActive, setIsActive] = useState(true);

	// Toggle button strikethrough handler
	const toggleButton = (e) => {
		setIsActive(!isActive);
	};

	// Template
	return (
		<Container>
			<Row>
				<Col>
					<Button
						type="button"
						className={
							"btn instruction-button " +
							(isActive ? "btn-success" : "btn-danger")
						}
						onClick={toggleButton}
					>
						<ImCheckmark hidden={!isActive} />
						<ImCross hidden={isActive} />
					</Button>
					<span className={isActive ? "" : "strike-through"}>
						{display_value}
					</span>
				</Col>
			</Row>
		</Container>
	);
}
