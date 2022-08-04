import React, { useState } from "react";
import "./recipe-ingredient.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ImCheckmark, ImCross } from "react-icons/im";

export default function RecipeIngredient({
	count,
	volume,
	units,
	container,
	description,
}) {

	// Local variables
	const _count = count ? count : "";
	const _volume = count && volume ? " - " + volume : volume ? volume : "";
	const _units = units ? units + (count || volume === "1" ? "" : "s") : "";
	const _container = container ? container : "";
	const _description = description ? description : "";

	// Filter for non-null values and then join them with a space.
	const display_value = [_count, _volume, _units, _container, _description]
		.filter(Boolean)
		.join(" ");

	// State variables
	const [isActive, setIsActive] = useState(true);

	// Button click handler for strike-through
	const toggleButton = (e) => {
		setIsActive(!isActive);
	};

	return (
		<Container>
			<Row>
				<Col>
					<Button
						type="button"
						className={
							"btn ingredient-button " +
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
