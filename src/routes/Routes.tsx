import {
	createBrowserRouter,
	RouterProvider,
	redirect,
} from "react-router-dom";
import HomePageView from "../views/HomePageView";
import SignUpView from "../views/SignUpView";
import LoginView from "../views/LoginView";
import LogOutView from "../views/LogOutView";

import { LeftSideBar } from "../views/LeftSideBar";
import { CategoriesView } from "../views/CategoriesView";
import UsersView from "../views/UsersView";
import { AdminRouteGuard } from "../components/users/AdminRouteGuard";
import ProfileView from "../views/ProfileView";
import { StockMovementsView } from "../views/StockMovementsView";
import { showToast } from "../helpers/showToast";

const isAuthenticated = () => {
	const token = localStorage.getItem("jwt");
	if (token) {
		// Si ya hay un token, no tiene sentido registrarse de nuevo.
		return redirect("/");
	}
	return null;
};

const isNotAuthenticated = () => {
	const token = localStorage.getItem("jwt");
	if (!token) {
		// Si no hay token, redirigimos al login.
		return redirect("/login");
	}
	return null; // Si hay token, permitimos el acceso.
};

const test = () => {
	showToast("warning", {
		message: "This is a test toast message.",
	});
};

const router = createBrowserRouter([
	{
		path: "/", //& Ya tiene el / , los hijos no lo requieren
		element: <LeftSideBar />,
		loader: isNotAuthenticated,
		children: [
			{ index: true, element: <HomePageView /> },
			{
				path: "categories",
				element: <CategoriesView />,
				loader: test,
			},
			{
				// Esta es la ruta "guardia". No tiene path.
				element: <AdminRouteGuard />,
				children: [
					// Todas las rutas que pongas aquí adentro estarán protegidas.
					{ path: "users", element: <UsersView /> },
				],
			},
			{ path: "profile", element: <ProfileView /> },
			{ path: "stock_movements", element: <StockMovementsView /> },
		],
	},
	{
		path: "/signup",
		element: <SignUpView />,
		loader: isAuthenticated,
	},

	{
		path: "/login",
		element: <LoginView />,
		loader: isAuthenticated,
	},

	{
		path: "/logout",
		element: <LogOutView />,
		loader: isNotAuthenticated,
	},
]);

export const AppRoutes = () => {
	return <RouterProvider router={router} />;
};
