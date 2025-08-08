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
import { toast } from "react-toastify";

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
	toast(
		({ closeToast }) => (
			<>
				<div>
					<h1 className="text-xl sm:text-sm">YAY</h1>
					<button
						className="rounded-full absolute top-[-8px] left-[-6px] opacity-0 group-hover:opacity-100 transition-opacity  shadow-inner shadow-zinc-400 bg-zinc-700/70  size-5 grid place-items-center border border-zinc-400"
						onClick={closeToast}
					>
						X
						<svg
							aria-hidden="true"
							viewBox="0 0 14 16"
							className={"fill-white size-3"}
						>
							<path
								fillRule="evenodd"
								d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
							/>
						</svg>
					</button>
				</div>
			</>
		),
		{
			className:
				"bg-zinc-900/40 backdrop-blur-lg shadow-inner shadow-zinc-600 border border-zinc-900/20 rounded-2xl text-white overflow-visible group",
			closeButton: false,
			theme: "colored",
		}
	);
};

const router = createBrowserRouter([
	{
		path: "/", //& Ya tiene el / , los hijos no lo requieren
		element: <LeftSideBar />,
		loader: isNotAuthenticated,
		children: [
			{ index: true, element: <HomePageView /> },
			{ path: "categories", element: <CategoriesView />, loader: test },
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
