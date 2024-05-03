import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ErrorPage from "./components/ErrorPage";
import reportWebVitals from "./reportWebVitals";
import { AuthRouteGuard } from "./store/authMiddleware";
const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/home",
		element: <AuthRouteGuard element={<Home />} />, // Wrap the App component with AuthRouteGuard
	},
]);

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
