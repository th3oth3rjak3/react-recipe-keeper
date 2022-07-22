import React from "react";
import { Card, Nav, Container, Row, Col } from "react-bootstrap";
import "./recipe-card.css";

function RecipeCard(props) {
	// props should have _id, header.title,

	return (
		<div className="recipe-card-container">
			<Card className="recipe-card">
				<Nav.Link href={"/MyRecipes" + props.link}>
					<Card.Header>{props.title}</Card.Header>
					{/* The above was in an h5 before */}
					<Card.Body style={{ backgroundColor: props.color }}>
						{/* <h5 className="card-title">{props.title}</h5> */}
						<Container className="recipe-card-container" fluid="md">
							<Row>
								<Col>
									<h5 className="card-title">
										{props.author ? "Author" : ""}
									</h5>
									<p className="card-text">{props.author}</p>
								</Col>
								<Col>
									<h5 className="card-title">
										{props.difficulty ? "Difficulty" : ""}
									</h5>
									<p className="card-text">
										{props.difficulty}
									</p>
								</Col>
								<Col>
									<h5 className="card-title">
										{props.timeAmount
											? "Time Required"
											: ""}
									</h5>
									<p className="card-text">
										{props.timeAmount
											? props.timeAmount +
											  " " +
											  props.timeUnits +
											  (props.timeAmount === 1
													? ""
													: "s")
											: ""}
									</p>
								</Col>
							</Row>
							<p className="card-text">{props.children}</p>
						</Container>
					</Card.Body>
				</Nav.Link>
			</Card>
		</div>
	);
}

export default RecipeCard;
