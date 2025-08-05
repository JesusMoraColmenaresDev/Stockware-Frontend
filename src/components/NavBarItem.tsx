import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";

type NavBarItemProps = {
	to: string;
	title?: string;
	icon: ReactNode;
	hovered?: boolean;
};

export const NavBarItem = ({ to, icon, title, hovered }: NavBarItemProps) => {
	return (
		<Link
			to={to}
			className="flex items-center justify-start gap-2 py-4 border w-full border-transparent duration-150 rounded-lg hover:border-bg-secondary group-hover:px-4"
		>
			{icon}

			{title && (
				<Transition
					show={hovered}
					unmount={false}
					enter="transition-all duration-200 ease-out"
					enterFrom="opacity-0 translate-x-2"
					enterTo="opacity-100 translate-x-0"
					leave="transition-all duration-100 ease-in"
					leaveFrom="opacity-100 translate-x-0"
					leaveTo="opacity-0 translate-x-2"
				>
					<span className="whitespace-nowrap font-medium">{title}</span>
				</Transition>
			)}
		</Link>
	);
};
