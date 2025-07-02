import { Outlet } from "react-router-dom";
import {
	LuStore,
	LuWarehouse,
	LuUserRound,
	LuCircleUserRound,
	LuSquareMenu,
	LuLogOut,
} from "react-icons/lu";
import { NavBarItem } from "../components/NavBarItem";

export const SideBar = () => {
	return (
		<>
			<div className="flex">
				<aside className="bg-bg-nav min-h-screen w-sidebar-collapsed flex flex-col overflow-hidden group hover:w-sidebar-expanded text-white transition-all duration-150 ease-in hover:duration-200 hover:ease-out">
					<div className="flex text-5xl justify-center px-2 py-[2rem] text-accent font-light font-bangers">
						{/* <h1 className="group-hover:opacity-0 translate-x-[5rem]">StkW</h1> */}
						{/* <h1 className="opacity-0 group-hover:opacity-100 group-hover:-translate-x-12">StockWare</h1> */}
						<h1>StockWare</h1>
					</div>

					<div className="flex flex-1 flex-col justify-center text-3xl">
						<NavBarItem
							title="Products"
							to="/"
							key={"/"}
							icon={<LuStore focusable={"false"} className="" />}
						/>
						<NavBarItem
							title="Products"
							to="/"
							key={"/"}
							icon={<LuWarehouse focusable={"false"} className="" />}
						/>
						<NavBarItem
							title="Categories"
							to="/categories"
							key={"/"}
							icon={<LuSquareMenu focusable={"false"} className="" />}
						/>
						<NavBarItem
							title="Users"
							to="/categories"
							key={"/"}
							icon={<LuUserRound focusable={"false"} className="" />}
						/>
						<NavBarItem
							title="Profile"
							to="/categories"
							key={"/"}
							icon={<LuCircleUserRound focusable={"false"} className="" />}
						/>
					</div>
					<h1 className="flex text-5xl justify-center px-2 py-[2rem] text-accent font-bold">
						<LuLogOut />
					</h1>
				</aside>

				<main className="flex-1">
					<Outlet />
				</main>
			</div>
		</>
	);
};
