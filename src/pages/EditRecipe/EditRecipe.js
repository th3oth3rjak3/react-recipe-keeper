import React, { useState, useEffect } from "react";
import "./EditRecipe.css";
import { useNavigate, useParams } from "react-router-dom";
import { editRecipe, getRecipeDetails } from "../../services/http.service";
const RecipeForm = React.lazy(() =>
	import("../../components/recipe-form/recipe-form")
);

export default function EditRecipe() {
	document.title = "Edit Recipe | RecipeKeeper";

	const { id } = useParams();
	const [instructions, setInstructions] = useState(null);
	const [ingredients, setIngredients] = useState(null);
	const [header, setHeader] = useState(null);

	const getRecipe = (params) =>
		getRecipeDetails(params).then((data) => {
			setHeader(data[0].header);
			setIngredients(data[0].ingredients);
			setInstructions(data[0].instructions);
		});

	useEffect(() => {
		getRecipe(id);
	}, [id]);

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
			editRecipe(id, formData).then(() => {
				navigate("/MyRecipes/RecipeDetails/" + id);
			});
		}
		setValidated(true);
	};
		return (ingredients && instructions && header ? (
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
		) : "");
}
