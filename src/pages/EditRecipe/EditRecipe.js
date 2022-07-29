import React, { useState, useEffect } from "react";
import "./EditRecipe.css";
import { useNavigate, useParams } from "react-router-dom";
import { editRecipe, getRecipeDetails } from "../../services/http.service";
const RecipeForm = React.lazy(() =>
	import("../../components/recipe-form/recipe-form")
);

export default function EditRecipe() {
	// Set browser tab to title
	document.title = "Edit Recipe | RecipeKeeper";

	// State variables
	const { id } = useParams();
	const [instructions, setInstructions] = useState(null);
	const [ingredients, setIngredients] = useState(null);
	const [header, setHeader] = useState(null);
	const [validated, setValidated] = useState(false);

	// Http service handler to get recipe details and set state
	const getRecipe = (params) =>
		getRecipeDetails(params).then((data) => {
			setHeader(data[0].header);
			setIngredients(data[0].ingredients);
			setInstructions(data[0].instructions);
		});

	// Once the id is loaded in the url bar, get the recipe
	useEffect(() => {
		getRecipe(id);
	}, [id]);

	// For navigation to other pages
	const navigate = useNavigate();

	// Header event handler for state changes.
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

	// Event handler to add an instruction
	const addInstruction = (e) => {
		e.preventDefault();
		const instruction = {
			step: instructions.length + 1,
			description: "",
		};
		setInstructions((prev) => [...prev, instruction]);
	};

	// Event handler to handle instruction changes and update state.
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

	// Event hadnler to remove an instruction
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

	// Event handler to add an ingredient
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

	// Event handler to manage ingredient changes and update state
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

	// Event handler to remove an ingredient
	const removeIngredient = (index) => {
		if (ingredients.length > 1) {
			setIngredients((prev) => prev.filter((item) => item !== prev[index]));
		}
	};

	// Event handler for form submission
	const onFormSubmit = (e) => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			// Assemble the data into a JSON object
			const formData = {
				header: header,
				ingredients: ingredients,
				instructions: instructions,
			};
			e.preventDefault();

			// Use http service to send the data and navigate to the view page
			editRecipe(id, formData).then(() => {
				navigate("/MyRecipes/RecipeDetails/" + id);
			});
		}
		setValidated(true);
	};

	// Template
	return ingredients && instructions && header ? (
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
	) : (
		""
	);
}
