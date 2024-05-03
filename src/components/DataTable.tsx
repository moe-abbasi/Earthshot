import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
	Rating,
	Tooltip,
	Slide,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { TableProps } from "../types/table";
import { rateConverter } from "../utils/rateConverter";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { RootState } from "../store/RootState";
import "./DataTable.css";

const DataTable: React.FC<TableProps> = ({ data, onRemove }) => {
	const username = useSelector((state: RootState) => state.auth.username);
	const disableIcon = (user: string) => {
		if (user === username) return false;
		else return true;
	};

	if (!data)
		return (
			<p>
				Select a country from the map to see its ratings or to submit a
				new rating!
			</p>
		);

	const shouldShowScrollbar = data.length > 1;

	return (
		<TransitionGroup>
			<TableContainer
				component={Paper}
				className={`table-container ${
					shouldShowScrollbar ? "show-scrollbar" : ""
				}`}
			>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell sx={{ paddingLeft: 0 }}>User</TableCell>
							<TableCell sx={{ paddingLeft: 0 }}>
								Rating
							</TableCell>
							<TableCell sx={{ paddingLeft: 0 }}></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row, index) => (
							<Slide
								direction="up"
								in={true}
								timeout={{ enter: index * 100 }}
								key={row.id}
							>
								<TableRow>
									<TableCell
										sx={{
											paddingLeft: 0,
											fontSize: "0.7rem",
										}}
									>
										{row.user}
									</TableCell>
									<TableCell sx={{ paddingLeft: 0 }}>
										<Rating
											name="rating"
											size="small"
											value={rateConverter(row.rating)}
											precision={0.1}
											readOnly
										/>
									</TableCell>
									<TableCell sx={{ paddingLeft: 0 }}>
										<Tooltip
											title="You can only delete your own ratings!"
											disableHoverListener={
												!disableIcon(row.user)
											}
										>
											<span>
												<IconButton
													size="small"
													onClick={() =>
														onRemove(row.id)
													}
													aria-label="remove"
													disabled={disableIcon(
														row.user
													)}
												>
													<DeleteIcon
														sx={{
															fontSize: "1rem",
														}}
													/>
												</IconButton>
											</span>
										</Tooltip>
									</TableCell>
								</TableRow>
							</Slide>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</TransitionGroup>
	);
};

export default DataTable;
