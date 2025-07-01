import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePageView from "../views/HomePageView";
import CreateProductsView from "../views/CreateProductsView";
import { SideBar } from "../components/SideBar";

const router = createBrowserRouter([
	{
		path: "/", //& Ya tiene el / , los hijos no lo requieren
		element: <SideBar />,
		children: [
			{ index: true, element: <HomePageView /> },
			{ path: "/product/create", element: <CreateProductsView /> },
		],
	},
]);

export const AppRoutes = () => {
	return <RouterProvider router={router} />;
};
