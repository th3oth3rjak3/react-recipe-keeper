import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./delete-modal.css";

export default function DeleteModal({
	showModal,
	confirmDelete,
	hideModal,
	index,
	message,
	heading,
}) {
	return (
		<Modal show={showModal} onHide={hideModal}>
			<Modal.Header closeButton>
				<Modal.Title>{heading}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{message}</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={hideModal}>
					Cancel
				</Button>
				<Button
					variant="danger"
					onClick={() => {
						confirmDelete(index);
						hideModal();
					}}
				>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
