import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./recipe-card.css";
import { NavLink } from "react-router-dom";

function RecipeCard({
	link,
	color,
	title,
	author,
	difficulty,
	timeAmount,
	timeUnits,
	message,
}) {
	// Private variables
	let _author_title = author ? "Author" : "";
	let _difficulty_title = difficulty ? "Difficulty" : "";
	let _time_required_title = timeAmount ? "Time Required" : "";
	let _time_data = timeAmount
		? timeAmount + " " + timeUnits + (timeAmount === "1" ? "" : "s")
		: "";

		// Template
	return (
		<div className="recipe-card-container">
			<Card className="recipe-card">
				<NavLink className="nav-link" to={link}>
					<Card.Header className="recipe-card-header">{title}</Card.Header>
					<Card.Body className="recipe-card-body" style={{ backgroundColor: color }}>
						<Container className="recipe-card-container" fluid="md">
							<Row>
								<Col>
									<h5 className="recipe-card-title">
										{_author_title}
									</h5>
									<p className="recipe-card-text">{author}</p>
								</Col>
								<Col>
									<h5 className="recipe-card-title">
										{_difficulty_title}
									</h5>
									<p className="recipe-card-text">{difficulty}</p>
								</Col>
								<Col>
									<h5 className="recipe-card-title">
										{_time_required_title}
									</h5>
									<p className="recipe-card-text">{_time_data}</p>
								</Col>
							</Row>
							<Row>
								<p className="recipe-card-text">{message}</p>
							</Row>
						</Container>
					</Card.Body>
				</NavLink>
			</Card>
		</div>
	);
}

export default RecipeCard;
