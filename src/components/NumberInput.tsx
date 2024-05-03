import React, { useState, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";

interface NumberInputProps {
	onValueChange: (newValue: string) => void;
	label: string;
}

const NumberInput: React.FC<NumberInputProps> = ({ onValueChange, label }) => {
	const [value, setValue] = useState<string>("");

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		const numericValue = Number(newValue);

		// Check if the new value is a valid number between 0 and 100
		if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
			setValue(newValue);
			onValueChange(newValue); // Call the onValueChange prop with the new value
		} else if (newValue === "") {
			// Allow an empty string
			setValue(newValue);
			onValueChange(newValue); // Call the onValueChange prop with an empty string
		}
	};

	return (
		<TextField
			label={label}
			type="number"
			value={value}
			onChange={handleChange}
			InputLabelProps={{
				shrink: true,
			}}
			size="small"
			inputProps={{
				min: 0,
				max: 100,
			}}
		/>
	);
};

export default NumberInput;
