import { Link, Outlet, useLocation } from "react-router-dom";
import {
	LuWarehouse,
	LuUserRound,
	LuCircleUserRound,
	LuSquareMenu,
	LuLogOut,
	LuSendToBack,
	LuMenu,
} from "react-icons/lu";
import { NavBarItem } from "../components/NavBarItem";
import { useState, useEffect, Fragment } from "react";
import { Transition } from "@headlessui/react";
import { useGetProfileInfo } from "../api/profileApi";

export const LeftSideBar = () => {
	const [hovered, setHovered] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { data: profile, isLoading, isError, error } = useGetProfileInfo();
	const location = useLocation();

	// Cierra el menú móvil al cambiar de ruta para mejorar la UX
	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [location.pathname]);

	const isExpanded = hovered || isMobileMenuOpen;

	return (
		<>
			<div className="flex relative">
				{/* Botón de Menú Hamburguesa (Solo para Móviles) */}
				<div className="md:hidden">
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="absolute top-8 left-4 z-10 p-2 rounded-md bg-bg-nav text-white"
						aria-label="Abrir menú"
					>
						<LuMenu size={24} />
					</button>
				</div>

				<aside
					className={`fixed peer bg-bg-nav min-h-screen w-sidebar-expanded flex flex-col overflow-hidden group text-white transition-all duration-200 ease-in-out z-40
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            md:w-sidebar-collapsed md:translate-x-0 md:hover:w-sidebar-expanded`}
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
				>
					<Link
						to="/"
						className="mt-[0.5rem] flex flex-col items-center justify-center w-full h-auto"
					>
						<div className="flex items-center justify-center overflow-visible">
							<img
								src="/StockWare_Icon.png"
								alt="StockWare Icon"
								className={`p-1 transition-transform duration-200 ease-out ${
									isExpanded ? "scale-150" : "scale-100"
								} w-16 h-16 object-contain`}
							/>
						</div>

						<Transition
							show={isExpanded}
							unmount={false}
							enter="transition-all duration-200 ease-out"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition-all duration-75 ease-linear"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<h2 className="flex mt-[0.5rem] text-5xl font-semibold text-center">
								<span className="text-bg-main">Stock</span>
								<span className="text-[#1E75B0]">Ware</span>
							</h2>
						</Transition>
					</Link>

					<div className="flex flex-1 flex-col justify-center text-3xl p-[1rem]">
						<NavBarItem
							hovered={isExpanded}
							title="Products"
							to="/"
							key={"/"}
							icon={<LuWarehouse focusable={"false"} />}
						/>
						<NavBarItem
							hovered={isExpanded}
							title="Categories"
							to="/categories"
							key={"/categories"}
							icon={<LuSquareMenu focusable={"false"} />}
						/>
						<NavBarItem
							hovered={isExpanded}
							title="Movements"
							to="/stock_movements"
							key={"/stock_movements"}
							icon={<LuSendToBack focusable={"false"} />}
						/>

						{profile?.role === "admin" && 
							<NavBarItem
								hovered={isExpanded}
								title="Users"
								to="/users"
								key={"/users"}
								icon={<LuUserRound focusable={"false"} />}
							/>
						}


						<NavBarItem
							hovered={isExpanded}
							title="Profile"
							to="/profile"
							key={"/Profile"}
							icon={<LuCircleUserRound focusable={"false"} />}
						/>
					</div>
					<h1 className="text-accent font-bold ">
						<Link
							title="LogOut"
							to={"/logout"}
							className="flex w-full text-5xl -translate-y-2 justify-center py-2 border border-transparent hover:border-bg-secondary duration-50 rounded-[8rem]"
						>
							<LuLogOut focusable={"false"} />
						</Link>
					</h1>
				</aside>

				{/* Overlay para el menú móvil */}
				<Transition
					show={isMobileMenuOpen}
					as={Fragment}
					enter="transition-opacity duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div
						className="fixed inset-0 bg-black/50 z-30 md:hidden"
						onClick={() => setIsMobileMenuOpen(false)}
					/>
				</Transition>

				<main className="flex-1 min-w-0 transition-all duration-200 ease-in-out md:ml-sidebar-collapsed md:peer-hover:ml-sidebar-expanded">
					<Outlet />
				</main>
			</div>
		</>
	);
};
