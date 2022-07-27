import React, { useState } from "react";
import "./AddRecipe.css";
import { Accordion, Stack, Button, Form } from "react-bootstrap";
import RecipeHeaderEdit from "../../components/recipe-header/recipe-header-edit";
import RecipeInstructionEdits from "../../components/recipe-instruction/recipe-instructions-edit";
import RecipeIngredientEdit from "../../components/recipe-ingredient/recipe-ingredient-edit";
import { useNavigate } from "react-router-dom";
import { addRecipe } from "../../services/http.service";

export default function AddRecipe() {
	document.title = "Add Recipe | RecipeKeeper";
	const [instructions, setInstructions] = useState([
		{ step: 1, description: "" },
	]);
	const [ingredients, setIngredients] = useState([
		{ count: "", volume: "", units: "", container: "", description: "" },
	]);
	const [header, setHeader] = useState({
		author: "",
		title: "",
		difficulty: "",
		timeAmount: "",
		timeUnits: "",
	});

	const [validated, setValidated] = useState(false);

	const navigate = useNavigate();

	const onHeaderChange = (event) => {
		event.preventDefault();
		event.persist();
		setHeader((prev) => {
			return {
				...prev,
				[event.target.name]: event.target.value,
			};
		});
	};

	const addInstruction = (e) => {
		e.preventDefault();
		const instruction = {
			step: instructions.length + 1,
			description: "",
		};
		setInstructions((prev) => [...prev, instruction]);
	};

	const onInstructionChange = (index, event) => {
		event.preventDefault();
		event.persist();
		setInstructions((prev) => {
			return prev.map((item, i) => {
				if (i !== index) {
					return item;
				}
				return {
					...item,
					[event.target.name]: event.target.value,
				};
			});
		});
	};

	const removeInstruction = (index) => {
		if (instructions.length > 1) {
			setInstructions((prev) => prev.filter((item) => item !== prev[index]));
			setInstructions((prev) =>
				prev.map((item, idx) => {
					return { ...item, step: idx + 1 };
				})
			);
		}
	};

	const addIngredient = (e) => {
		e.preventDefault();
		const ingredient = {
			count: "",
			volume: "",
			units: "",
			container: "",
			description: "",
		};
		setIngredients((prev) => [...prev, ingredient]);
	};

	const onIngredientChange = (index, event) => {
		event.preventDefault();
		event.persist();
		setIngredients((prev) => {
			return prev.map((item, i) => {
				if (i !== index) {
					return item;
				}
				return {
					...item,
					[event.target.name]: event.target.value,
				};
			});
		});
	};

	const removeIngredient = (index) => {
		if (ingredients.length > 1) {
			setIngredients((prev) => prev.filter((item) => item !== prev[index]));
		}
	};

	const onFormSubmit = (e) => {
		const form = e.currentTarget;
		e.preventDefault();
		if (form.checkValidity() === false){	
			e.stopPropagation();
			console.log("not valid");
		} else {
			console.log("pretending to submit the form");
			const formData = {
				header: header,
				ingredients: ingredients,
				instructions: instructions
			};
			console.log(formData);
			addRecipe(formData);
		}
		setValidated(true);
	};

	return (
		<Form onSubmit={onFormSubmit} validated={validated} noValidate>
			<Accordion defaultActiveKey={""} alwaysOpen="false">
				<Accordion.Item eventKey="0">
					<Accordion.Header>
						{header.title === "" ? "New Recipe" : header.title}
					</Accordion.Header>
					<Accordion.Body>
						<RecipeHeaderEdit header={header} onHeaderChange={onHeaderChange} />
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>Ingredients</Accordion.Header>
					<Accordion.Body>
						<RecipeIngredientEdit
							ingredients={ingredients}
							onIngredientChange={onIngredientChange}
							removeIngredient={removeIngredient}
							addIngredient={addIngredient}
						/>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="2">
					<Accordion.Header>Instructions</Accordion.Header>
					<Accordion.Body>
						<RecipeInstructionEdits
							instructions={instructions}
							onInstructionChange={onInstructionChange}
							addInstruction={addInstruction}
							removeInstruction={removeInstruction}
						/>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="3">
					<Accordion.Header>Conversion Tools</Accordion.Header>
					<Accordion.Body>
						<Stack gap={3}>{"Coming soon"}</Stack>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<Button type="submit" className="btn btn-primary mr-3">
				{"Submit"}
			</Button>
			<Button type="button" className="btn btn-danger m-3" onClick={() => {navigate("/")}}>
				{"Cancel"}
			</Button>
		</Form>
	);
}
