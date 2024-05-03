import { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./Login.css";
import image from "../assets/loginImage.jpg";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const dispatch = useDispatch<any>();
	const navigate = useNavigate();
	const [username, setUsername] = useState<string>("");

	const handleLogin = () => {
		dispatch(loginUser(username));
		navigate("/home");
	};

	return (
		<div className="container">
			<div className="image-container">
				<img src={image} alt="World Map" className="image" />
			</div>
			<div className="form-container">
				<div className="form">
					<TextField
						label="Username"
						variant="outlined"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						fullWidth
						margin="normal"
					/>
					<Button
						variant="contained"
						color="primary"
						fullWidth
						style={{ marginTop: "16px" }}
						onClick={handleLogin}
					>
						LOGIN
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Login;
