import React, { useState } from "react";
import { DropdownProps } from "../types";
import {
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	SelectChangeEvent,
} from "@mui/material";

const Dropdown: React.FC<DropdownProps> = ({
	label,
	options,
	defaultValue,
	onChange,
}) => {
	const [selectedValue, setSelectedValue] = useState(defaultValue);

	const handleChange = (event: SelectChangeEvent<string>) => {
		const value = event.target.value;
		setSelectedValue(value);
		if (onChange) {
			onChange(value);
		}
	};

	return (
		<FormControl sx={{ minWidth: 120 }}>
			<InputLabel id="dropdown-label">{label}</InputLabel>
			<Select
				labelId="dropdown-label"
				value={selectedValue}
				onChange={handleChange}
				label={label}
			>
				{options.map((option) => (
					<MenuItem key={option.code} value={option.name}>
						{option.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default Dropdown;
