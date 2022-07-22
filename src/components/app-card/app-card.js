import React from "react";
import { Card, Nav } from "react-bootstrap";
import "./app-card.css";

function AppCard(props) {
	return (
		<Card>
			<Nav.Link href={props.link}>
				<Card.Body style={{ backgroundColor: props.color }}>
					<h5 className="card-title">{props.title}</h5>
					<p className="card-text">{props.subtitle}</p>
				</Card.Body>
			</Nav.Link>
		</Card>
	);
}

export default AppCard;
