import { Link, Outlet } from "react-router-dom";
import {
	LuWarehouse,
	LuUserRound,
	LuCircleUserRound,
	LuSquareMenu,
	LuLogOut,
	LuSendToBack,
} from "react-icons/lu";
import { NavBarItem } from "../components/NavBarItem";
import { useState } from "react";
import { Transition } from "@headlessui/react";

export const LeftSideBar = () => {
	const [hovered, setHovered] = useState(false);

	return (
		<>
			<div className="flex">
				<aside
					className="fixed peer bg-bg-nav min-h-screen w-sidebar-collapsed flex flex-col overflow-hidden group hover:w-sidebar-expanded text-white transition-all duration-150 ease-in hover:duration-200 hover:ease-out"
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
									hovered ? "scale-150" : "scale-100"
								} w-16 h-16 object-contain`}
							/>
						</div>

						<Transition
							show={hovered}
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
							hovered={hovered}
							title="Products"
							to="/"
							key={"/"}
							icon={<LuWarehouse focusable={"false"} />}
						/>
						<NavBarItem
							hovered={hovered}
							title="Categories"
							to="/categories"
							key={"/categories"}
							icon={<LuSquareMenu focusable={"false"} />}
						/>
						<NavBarItem
							hovered={hovered}
							title="Movements"
							to="/stock_movements"
							key={"/stock_movements"}
							icon={<LuSendToBack focusable={"false"} />}
						/>
						<NavBarItem
							hovered={hovered}
							title="Users"
							to="/users"
							key={"/users"}
							icon={<LuUserRound focusable={"false"} />}
						/>
						<NavBarItem
							hovered={hovered}
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

				<main className="flex-1 ml-sidebar-collapsed peer-hover:ml-sidebar-expanded transition-all duration-150 ease-in hover:duration-200 hover:ease-out">
					<Outlet />
				</main>
			</div>
		</>
	);
};
