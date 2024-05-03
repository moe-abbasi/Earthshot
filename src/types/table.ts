export type TableData = {
	id: string;
	user: string;
	rating: number;
};

export type TableProps = {
	data: TableData[] | undefined;
	onRemove: (id: string) => void;
};
