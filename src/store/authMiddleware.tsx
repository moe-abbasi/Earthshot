import { Navigate } from "react-router-dom";

interface AuthRouteGuardProps {
	element: JSX.Element;
}

export const AuthRouteGuard: React.FC<AuthRouteGuardProps> = ({ element }) => {
	const isAuthenticated = sessionStorage.getItem("user");

	return isAuthenticated ? element : <Navigate to="/" />;
};
