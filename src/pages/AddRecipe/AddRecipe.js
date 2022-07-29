import React, { useState } from "react";
import "./AddRecipe.css";
import { useNavigate } from "react-router-dom";
import { addRecipe } from "../../services/http.service";
const RecipeForm = React.lazy(() =>
	import("../../components/recipe-form/recipe-form")
);

export default function AddRecipe() {

	// Set the browser tab to the title below
	document.title = "Add Recipe | RecipeKeeper";

	// State variables to manage all the sub-component state
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

	// Form validation state variables
	const [validated, setValidated] = useState(false);

	const navigate = useNavigate();

	// Change event handler for the header section
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

	// Event handler to add a new instruction to the form
	const addInstruction = (e) => {
		e.preventDefault();
		const instruction = {
			step: instructions.length + 1,
			description: "",
		};
		setInstructions((prev) => [...prev, instruction]);
	};

	// Change event handler to update state for instruction changes
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

	// Event handler to remove instruction from the form.
	const removeInstruction = (index) => {
		if (instructions.length > 1) {
			setInstructions((prev) => prev.filter((item) => item !== prev[index]));
			setInstructions((prev) =>
				prev.map((item, idx) => {

					// Renumber the steps when one is deleted.
					return { ...item, step: idx + 1 };
				})
			);
		}
	};

	// Event handler to add an ingredient to the form.
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

	// Event handler to manage state changes for ingredients
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

	// Event handler to remove an ingredient from the form.
	const removeIngredient = (index) => {
		if (ingredients.length > 1) {
			setIngredients((prev) => prev.filter((item) => item !== prev[index]));
		}
	};

	// Form submission event handler
	const onFormSubmit = (e) => {
		const form = e.currentTarget;

		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			const formData = {
				header: header,
				ingredients: ingredients,
				instructions: instructions,
			};
			e.preventDefault();

			// Http service to add the recipe to the database.
			// Navigate to the new recipe once completed.
			addRecipe(formData).then((res) => {
				navigate("/MyRecipes/RecipeDetails/" + res.id);
			});
		}
		setValidated(true);
	};

	// Template
	return (
		<RecipeForm
			onFormSubmit={onFormSubmit}
			validated={validated}
			onHeaderChange={onHeaderChange}
			header={header}
			ingredients={ingredients}
			onIngredientChange={onIngredientChange}
			removeIngredient={removeIngredient}
			addIngredient={addIngredient}
			instructions={instructions}
			onInstructionChange={onInstructionChange}
			addInstruction={addInstruction}
			removeInstruction={removeInstruction}
		></RecipeForm>
	);
}
