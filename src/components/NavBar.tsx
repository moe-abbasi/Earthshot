import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { RootState } from "../store/RootState";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/authActions";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
	const username = useSelector((state: RootState) => state.auth.username);
	const dispatch = useDispatch<any>();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logoutUser());
		navigate("/");
	};
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						Welcome {username}
					</Typography>
					<Button color="inherit" onClick={handleLogout}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
