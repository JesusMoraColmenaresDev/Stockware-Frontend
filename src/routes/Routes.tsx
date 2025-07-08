import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePageView from "../views/HomePageView";
import CreateProductsView from "../views/CreateProductsView";
import { LeftSideBar } from "../views/LeftSideBar";

const router = createBrowserRouter([
	{
		path: "/", //& Ya tiene el / , los hijos no lo requieren
		element: <LeftSideBar />,
		children: [
			{ index: true, element: <HomePageView /> },
			{ path: "/product/create", element: <CreateProductsView /> },
		],
	},
]);

export const AppRoutes = () => {
	return <RouterProvider router={router} />;
};
