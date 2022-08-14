import React, { useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { FaPlus, FaMinus, FaUndo } from "react-icons/fa";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { doConversion } from "../../services/http.service";
import "./tools.css";

export default function Tools() {
	// Default shape of conversion object
	const conversionDefault = {
		fractionFrom: "",
		amountFrom: "",
		amountTo: "",
		unitsFrom: "",
		unitsTo: "",
	};

	// Valid weight options
	const weight = [
		{ display: "Ounce", value: "ounce" },
		{ display: "Pound", value: "pound" },
		{ display: "Milligram", value: "milligram" },
		{ display: "Gram", value: "gram" },
		{ display: "Kilogram", value: "kilogram" },
	];

	// Valid volume options
	const volume = [
		{ display: "Cup", value: "cup" },
		{ display: "Pint", value: "pint" },
		{ display: "Quart", value: "quart" },
		{ display: "Gallon", value: "gallon" },
		{ display: "Teaspoon", value: "teaspoon" },
		{ display: "Tablespoon", value: "tablespoon" },
		{ display: "Milliliter", value: "milliliter" },
		{ display: "Liter", value: "liter" },
	];

	// Valid temperature options
	const temperature = [
		{ display: "Celsius", value: "celsius" },
		{ display: "Fahrenheit", value: "fahrenheit" },
	];

	// Join all lists together into one for initial display
	const options = [].concat.apply([], [weight, volume, temperature]);

	// State variables
	const [convertData, setConvertData] = useState(conversionDefault);
	const [counterValue, setCounterValue] = useState(0);
	const [unitOptions, setUnitOptions] = useState(options);

	// Observe a typed value and change state in the counter tool
	const handleCounterChange = (e) => {
		setCounterValue(e.target.value);
	};

	// Respond to a button click and change state to increase the count
	const counterIncrease = () => {
		setCounterValue((parseInt(counterValue) || 0) + 1);
	};

	// Respond to a button click and change state to decrease the count.
	const counterDecrease = () => {
		if (counterValue > 0) {
			setCounterValue((parseInt(counterValue) || 0) - 1);
		}
	};

	// Reset the counter to 0.
	const counterReset = () => {
		setCounterValue(0);
	};

	// Watch for changes in the option list to filter the units to list.
	const handleChanges = (e) => {
		// Destructure the object that changed.
		const { name, value } = e.target;

		// Update the state of the currently selected item from the dropdown
		setConvertData((prevState) => ({
			...prevState,
			[name]: value,
		}));


		if (name === "fractionFrom") {
			setConvertData((prevState) => ({
				...prevState,
				amountFrom: value,
			}));
		}

		// When the unitsFrom dropdown changes, update the unitsTo dropdown
		if (name === "unitsFrom") {
			// If a temperature was chosen
			if (temperature.some((item) => item.value === value)) {
				// Filter out the unit that was chosen so self-conversions don't occur
				setUnitOptions(temperature.filter((temp) => temp.value !== value));
			}

			// If a weight was chosen
			if (weight.some((item) => item.value === value)) {
				// Filter out self-conversions (aka pounds to pounds)
				setUnitOptions(weight.filter((weight) => weight.value !== value));
			}

			// If a volume was chosen
			if (volume.some((item) => item.value === value)) {
				// Filter out self-convsersions
				setUnitOptions(volume.filter((volume) => volume.value !== value));
			}
			setConvertData((prevState) => ({
				...prevState,
				unitsTo: "",
			}));
		}
		setConvertData((prevState) => ({
			...prevState,
			amountTo: "",
		}));
	};

	// State variables for form validation
	const [convertValidated, setConvertValidated] = useState(false);

	// Submit handler for the conversion tool
	const convertSubmit = (e) => {
		// Local variable to represent the form object
		const convertForm = e.currentTarget;

		if (convertForm.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			e.preventDefault();

			// Call http service to send data to conversion microservice
			// Then update state variables
			doConversion(convertData)
				.then((res) => {
					if (res) {
						setConvertData(res);
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}
		setConvertValidated(true);
	};

	// Template
	return (
		<Container fluid>
			<Form
				className="mt-3"
				onSubmit={convertSubmit}
				validated={convertValidated}
				noValidate
			>
				<Row className="m-3">
					<Col xl>
					<FloatingLabel label="Fraction Conversion" className="mb-3">
							<Form.Select
								name="fractionFrom"
								value={convertData.fractionFrom}
								onChange={handleChanges}
								required
							>
								<option value="">{""}</option>
								<option value="0.125">{"1/8"}</option>
								<option value="0.25">{"1/4"}</option>
								<option value="0.375">{"3/8"}</option>
								<option value="0.5">{"1/2"}</option>
								<option value="0.625">{"5/8"}</option>
								<option value="0.75">{"3/4"}</option>
								<option value="0.875">{"7/8"}</option>
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								Units cannot be empty.
							</Form.Control.Feedback>
						</FloatingLabel>
					</Col>
					<Col xl>
						<FloatingLabel label="Amount From" className="mb-3">
							<Form.Control
								name="amountFrom"
								pattern="[0-9]*[.]{0,1}[0-9]+"
								value={convertData.amountFrom}
								onChange={handleChanges}
								required
							></Form.Control>
							<Form.Control.Feedback type="invalid">
								Amount must be a valid number.
							</Form.Control.Feedback>
						</FloatingLabel>
					</Col>
					<Col xl>
						<FloatingLabel label="Units From" className="mb-3">
							<Form.Select
								name="unitsFrom"
								value={convertData.unitsFrom}
								onChange={handleChanges}
								required
							>
								<option value="" disabled>
									{""}
								</option>
								{options.map((opt, index) => {
									return (
										<option key={index} value={opt.value}>
											{temperature.includes(opt)
												? convertData.amountFrom === "1"
													? "Degree " + opt.display
													: "Degrees " + opt.display
												: opt.display +
												  (convertData.amountFrom === "1" ? "" : "s")}
										</option>
									);
								})}
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								Units cannot be empty.
							</Form.Control.Feedback>
						</FloatingLabel>
					</Col>
					<Col xl>
						<FloatingLabel label="Amount To" className="mb-3">
							<Form.Control
								name="amountTo"
								value={convertData.amountTo}
								onChange={handleChanges}
								disabled
							></Form.Control>
						</FloatingLabel>
					</Col>
					<Col xl>
						<FloatingLabel label="Units To" className="mb-3">
							<Form.Select
								name="unitsTo"
								value={convertData.unitsTo}
								onChange={handleChanges}
								required
							>
								<option value="" disabled>
									{""}
								</option>
								{unitOptions.map((opt, index) => {
									return (
										<option key={index} value={opt.value}>
											{temperature.some(
												(option) => option.display === opt.display
											)
												? "Degrees " + opt.display
												: opt.display + "s"}
										</option>
									);
								})}
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								Units cannot be empty.
							</Form.Control.Feedback>
						</FloatingLabel>
					</Col>
					<Col xl={1}>
						<Button type="submit" className="btn btn-primary convert-button">
							Convert
						</Button>
					</Col>
				</Row>
			</Form>
			<Row className="m-3">
				<Col xl={2}>
					<FloatingLabel label="Ingredient Counter" className="mb-3">
						<Form.Control
							name="amountTo"
							value={counterValue}
							onChange={handleCounterChange}
						></Form.Control>
					</FloatingLabel>
				</Col>
			</Row>
			<Row className="ms-4">
				<Button
					type="button"
					className="btn btn-primary counter-button"
					onClick={counterIncrease}
				>
					<FaPlus />
				</Button>
				<Button
					type="button"
					className="btn btn-secondary counter-button"
					onClick={counterDecrease}
				>
					<FaMinus />
				</Button>
				<Button
					type="button"
					className="btn btn-danger counter-button"
					onClick={counterReset}
				>
					<FaUndo />
				</Button>
			</Row>
		</Container>
	);
}
