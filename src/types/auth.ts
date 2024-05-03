import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store/RootState";
import { Action } from "redux";
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
