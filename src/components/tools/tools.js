import React, { useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { FaPlus, FaMinus, FaUndo } from "react-icons/fa";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { doConversion } from "../../services/http.service";
import "./tools.css";

export default function Tools() {
	const conversionDefault = {
		amountFrom: "",
		amountTo: "",
		unitsFrom: "",
		unitsTo: "",
	};

	const weight = [
		{ display: "Ounce", value: "ounce" },
		{ display: "Pound", value: "pound" },
		{ display: "Milligram", value: "milligram" },
		{ display: "Gram", value: "gram" },
		{ display: "Kilogram", value: "kilogram" },
	];
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
	const temperature = [
		{ display: "Celsius", value: "celsius" },
		{ display: "Fahrenheit", value: "fahrenheit" },
	];
	const options = [].concat.apply([], [weight, volume, temperature]);

	const [convertData, setConvertData] = useState(conversionDefault);
	const [counterValue, setCounterValue] = useState(0);
	const [unitOptions, setUnitOptions] = useState(options);

	const handleCounterChange = (e) => {
		setCounterValue(e.target.value);
	};

	const counterIncrease = () => {
		setCounterValue((parseInt(counterValue) || 0) + 1);
	};

	const counterDecrease = () => {
		if (counterValue > 0) {
			setCounterValue((parseInt(counterValue) || 0) - 1);
		}
	};

	const counterReset = () => {
		setCounterValue(0);
	};

	const handleChanges = (e) => {
		const { name, value } = e.target;
		setConvertData((prevState) => ({
			...prevState,
			[name]: value,
		}));
		if (name === "unitsFrom") {
			if (temperature.some((item) => item.value === value)) {
				setUnitOptions(temperature.filter((temp) => temp.value !== value));
			}
			if (weight.some((item) => item.value === value)) {
				setUnitOptions(weight.filter((weight) => weight.value !== value));
			}
			if (volume.some((item) => item.value === value)) {
				setUnitOptions(volume.filter((volume) => volume.value !== value));
			}
		}
	};

	const [convertValidated, setConvertValidated] = useState(false);

	const convertSubmit = (e) => {
		const convertForm = e.currentTarget;

		if (convertForm.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			e.preventDefault();
			doConversion(convertData)
				.then((res) => setConvertData(res))
				.catch((err) => {
					console.error(err);
				});
		}
		setConvertValidated(true);
	};

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
						<FloatingLabel label="Amount From" className="mb-3">
							<Form.Control
								name="amountFrom"
								pattern="[0-9]*[.]{0,1}[0-9]+"
								value={convertData?.amountFrom}
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
												? convertData?.amountFrom === "1"
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
