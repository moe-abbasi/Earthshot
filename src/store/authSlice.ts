import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	isLoggedIn: boolean;
	username: string | null;
}

const initialState: AuthState = {
	isLoggedIn: !!sessionStorage.getItem("user"),
	username: capitalizeFirstLetter(sessionStorage.getItem("user") || ""),
};

function capitalizeFirstLetter(str: string) {
	return str.substring(0, 1).toUpperCase() + str.substring(1);
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state, action: PayloadAction<string>) {
			state.isLoggedIn = true;
			state.username = capitalizeFirstLetter(action.payload);
		},
		logout(state) {
			state.isLoggedIn = false;
			state.username = null;
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
