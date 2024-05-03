import { Products } from "../types";

export type DropdownProps = {
	label: string;
	options: Products[];
	defaultValue?: string;
	onChange?: (value: string) => void;
};
