import React from "react";
import "./recipe-header-view.css";
import { Container, Row, Col } from "react-bootstrap";

export default function RecipeHeaderView({
	author,
	difficulty,
	time_amount,
	time_units,
}) {

	// local variables
	const time_required =
		time_amount + " " + time_units + (time_amount === "1" ? "" : "s");

	// Template
	return (
		<Container>
			<Row>
				<Col>
					<h5 className="underline">{"Author"}</h5>
					<span>{author}</span>
				</Col>
				<Col>
					<h5 className="underline">{"Difficulty"}</h5>
					<span>{difficulty}</span>
				</Col>
				<Col>
					<h5 className="underline">{"Time Required"}</h5>
					<span>{time_required}</span>
				</Col>
			</Row>
		</Container>
	);
}
