import React from "react";
import { Card, Nav } from "react-bootstrap";
import "./app-card.css";

function AppCard({link, color, title, subtitle}) {
	return (
		<Card>
			<Nav.Link href={link}>
				<Card.Body style={{ backgroundColor: color }}>
					<h5 className="card-title">{title}</h5>
					<p className="card-text">{subtitle}</p>
				</Card.Body>
			</Nav.Link>
		</Card>
	);
}

export default AppCard;
