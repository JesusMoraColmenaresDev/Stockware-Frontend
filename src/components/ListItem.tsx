import { LuSearch, LuSquarePen, LuX } from "react-icons/lu";
import type { ProductType } from "../types";

type ListItemProps = {
	product: ProductType;
	categoryDictionary: Record<number, string>;
};

export const ListItem = ({ product, categoryDictionary }: ListItemProps) => {
	return (
		<tr className="">
			<td className="">
				<div className="flex items-center justify-center text-center">
					{product.id}
				</div>
			</td>
			<td className="w-1/2">
				<div className="flex items-center" title={`${product.name}`}>
					<span className="block truncate px-2">{product.name}</span>
				</div>
			</td>
			<td className="">
				<div
					className="flex items-center justify-center text-center"
					title={`${product.stock}`}
				>
					{product.stock}
				</div>
			</td>
			<td className="">
				<div
					className="flex items-center justify-center truncate text-center"
					title={`${categoryDictionary[product.category_id]}`}
				>
					{categoryDictionary[product.category_id]}
				</div>
			</td>
			<td>
				<div className="flex items-center justify-center h-[2rem] gap-2 ">
					<LuSearch className="w-[1.5rem] h-auto hover:text-accent" />
					<LuSquarePen className="w-[1.5rem] h-auto hover:text-accent" />
					<LuX className="w-[1.5rem] h-auto hover:text-accent" />
				</div>
			</td>
		</tr>
	);
};
