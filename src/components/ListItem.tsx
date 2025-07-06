import { LuSearch, LuSquarePen, LuX } from "react-icons/lu";
import type { ProductType } from "../types";

type ListItemProps = {
	product: ProductType;
};

export const ListItem = ({ product }: ListItemProps) => {
	return (
		<tr className="border">
			<td className="border">
				<div className="flex items-center justify-center">{product.id}</div>
			</td>
			<td className="border max-w-0 w-1/2 bg-bg-secondary rounded-lg">
				<div className="truncate px-2 flex items-center ">{product.name}</div>
			</td>
			<td className="border">
				<div className="flex items-center justify-center">{product.stock}</div>
			</td>
			<td className="border">
				<div className="flex items-center justify-center">
					{product.category_id}
				</div>
			</td>
			<td>
				<div className="flex items-center justify-center h-[2rem] gap-2 border">
					<LuSearch className="w-[1.5rem] h-auto hover:text-accent" />
					<LuSquarePen className="w-[1.5rem] h-auto hover:text-accent" />
					<LuX className="w-[1.5rem] h-auto hover:text-accent" />
				</div>
			</td>
		</tr>
	);
};
