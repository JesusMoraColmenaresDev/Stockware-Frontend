import { Link, Outlet } from "react-router-dom";
import {
	LuWarehouse,
	LuUserRound,
	LuCircleUserRound,
	LuSquareMenu,
	LuLogOut,
} from "react-icons/lu";
import { NavBarItem } from "../components/NavBarItem";

export const LeftSideBar = () => {
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
							icon={<LuWarehouse focusable={"false"} />}
						/>
						<NavBarItem
							title="Categories"
							to="/categories"
							key={"/categories"}
							icon={<LuSquareMenu focusable={"false"} />}
						/>
						<NavBarItem
							title="Users"
							to="/users"
							key={"/users"}
							icon={<LuUserRound focusable={"false"} />}
						/>
						<NavBarItem
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

				<main className="flex-1">
					<Outlet />
				</main>
			</div>
		</>
	);
};
