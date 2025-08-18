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
import { api } from "../api/axiosConfig";

/**
 * Loader for public pages like /login or /signup.
 * If a valid token exists, redirect to `/`.
 * If token missing/invalid, allow the route (return null).
 */
const isAuthenticated = async () => {
	const token = localStorage.getItem("jwt");
	if (!token) return null; // no token -> let user access /login

	try {
		const res = await api.get("/auth/validate");
		if (res.status >= 200 && res.status < 300) {
			// valid token -> redirect to the app root
			return redirect("/");
		}
		// not a 2xx -> remove token and allow login
		localStorage.removeItem("jwt");
		return null;
	} catch (err) {
		console.log("unauthenticated", err);
		// network / 401 -> remove token and allow login
		localStorage.removeItem("jwt");
		return null;
	}
};

/**
 * Loader for protected root (and other protected routes).
 * If token is valid -> return null (allow render).
 * If not -> remove token and redirect to /login.
 */
const isNotAuthenticated = async () => {
	const token = localStorage.getItem("jwt");
	if (!token) return redirect("/login");

	try {
		const res = await api.get("/auth/validate");

		// controller returns 204 No Content on success; accept any 2xx
		if (res.status >= 200 && res.status < 300) return null; // Lo mismo que redirect("/"), que no se hace directo pa evitar bucles infinitos

		// non-2xx -> treat as unauthenticated
		localStorage.removeItem("jwt");
		return redirect("/login");
	} catch (err) {
		console.log("unauthenticated", err);
		// network error or 401 -> treat as unauthenticated
		// network / 401 / axios interceptor case -> clean up and redirect
		localStorage.removeItem("jwt");
		return redirect("/login");
	}
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
				// loader: () => {
				// 	showToast("warning", {
				// 		message:
				// 			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem impedit sed tempora ut, est, eligendi debitis praesentium quo molestiae culpa asperiores in error nulla nemo. Cupiditate, doloremque hic. Eos, dicta?",
				// 	});
				// },
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
