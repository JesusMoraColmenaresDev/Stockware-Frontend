import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import HomePageView from "../views/HomePageView";
import CreateProductsView from "../views/CreateProductsView";
import { SideBar } from "../views/SideBar";
import SignUpView from "../views/SignUpView";
import LoginView from "../views/LoginView";
import LogOutView from "../views/LogOutView";

const isAuthenticated = () => {
	const token = localStorage.getItem('jwt');
		if (token) {
			// Si ya hay un token, no tiene sentido registrarse de nuevo.
			return redirect('/');
		}
		return null;
}

const isNotAuthenticated = () => {
	const token = localStorage.getItem('jwt');
	if (!token) {
		// Si no hay token, redirigimos al login.
		return redirect('/login');
	}
	return null; // Si hay token, permitimos el acceso.
}


const router = createBrowserRouter([
	{
		path: "/", //& Ya tiene el / , los hijos no lo requieren
		element: <SideBar />,
		loader: isNotAuthenticated,
		children: [
			{ index: true, element: <HomePageView /> },
			{ path: "/product/create", element: <CreateProductsView /> },
			
		],
	},
	{

    	path: "/signup",
    	element: <SignUpView />,	
		loader: isAuthenticated
  	},

	{
    	path: "/login",
    	element: <LoginView />,
		loader: isAuthenticated
  	},

	{
		path: "/logout", 
		element: <LogOutView />,
		loader : isNotAuthenticated
	}

]);

export const AppRoutes = () => {
	return <RouterProvider router={router} />;
};
