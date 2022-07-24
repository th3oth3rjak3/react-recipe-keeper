import React from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./app-card.css";

function AppCard({link, color, title, subtitle}) {
	return (
		<Card>
			<NavLink to={link} className="nav-link">
				<Card.Body style={{ backgroundColor: color }}>
					<h5 className="card-title">{title}</h5>
					<p className="card-text">{subtitle}</p>
				</Card.Body>
			</NavLink>
		</Card>
	);
}

export default AppCard;
