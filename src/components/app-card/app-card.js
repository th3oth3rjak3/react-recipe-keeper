import React from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./app-card.css";

function AppCard({link, color, title, subtitle}) {
	return (
		<Card className="app-card">
			<NavLink to={link} className="nav-link">
				<Card.Body className="app-card-body" style={{ backgroundColor: color }}>
					<h5 className="app-card-title">{title}</h5>
					<p className="app-card-text">{subtitle}</p>
				</Card.Body>
			</NavLink>
		</Card>
	);
}

export default AppCard;
