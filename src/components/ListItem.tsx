import { LuSearch, LuSquarePen, LuX } from "react-icons/lu";
import type { ProductType } from "../types";

type ListItemProps = {
	product: ProductType;
};

export const ListItem = ({ product }: ListItemProps) => {
	return (
		<tr>
			<td>{product.id}</td>
			<td>{product.name}</td>
			<td>{product.stock}</td>
			<td>{product.category_id}</td>
			<td className="flex">
				<LuSearch />
				<LuSquarePen />
				<LuX />
			</td>
		</tr>
	);
};
