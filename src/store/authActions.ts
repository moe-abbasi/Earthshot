// authActions.ts
import { AppThunk } from "../types/auth";
import { login, logout } from "./authSlice";

export const loginUser =
	(username: string): AppThunk =>
	(dispatch) => {
		// Perform login logic
		// Once login is successful, store username in session storage and dispatch the login action
		sessionStorage.setItem("user", username);
		dispatch(login(username));
	};

export const logoutUser = (): AppThunk => (dispatch) => {
	// Perform logout logic
	// Clear username from session storage and dispatch the logout action
	sessionStorage.removeItem("user");
	dispatch(logout());
};
