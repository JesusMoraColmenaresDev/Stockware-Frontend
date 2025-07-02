import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type NavBarItemProps = {
	to: string;
	title: string;
	icon: ReactNode;
};

export const NavBarItem = ({ to, icon, title }: NavBarItemProps) => {
	return (
		<Link
			to={to}
			className="flex justify-center gap-2 py-2 border w-auto border-transparent duration-50 rounded-4xl hover:border-bg-secondary"
		>
			{icon}
			<span className="whitespace-nowrap opacity-0 w-0 translate-x-4 duration-0 ease-in group-hover:duration-400 group-hover:ease-out group-hover:opacity-100  group-hover:w-auto  group-hover:translate-x-0">
				{title}
			</span>
		</Link>
	);
};
