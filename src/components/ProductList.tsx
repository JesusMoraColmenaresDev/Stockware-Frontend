import { ListItem } from "./ListItem";
import type { ProductType } from "../types";
import { type CategoryType } from "../types/index";
import { useMemo } from "react";

type ProductListProps = {
	products: ProductType[];
	categories: CategoryType[];
};

export const ProductList = ({ products, categories }: ProductListProps) => {
	const categoryDictionary = useMemo<Record<number, string>>(
		() =>
			categories!.reduce((dict, category) => {
				dict[category.id] = category.name;
				return dict;
			}, {} as Record<number, string>),
		[categories]
	);

	{
		if (!products) {
			<h1>Productos No Encontrados . . .</h1>;
		} else {
			return (
				<table className="w-full table-fixed border-separate border-spacing-x-[0.5rem] border-spacing-y-[0.5rem]">
					<thead className="">
						<tr className="">
							<th className=" w-1/40 py-[0.1rem] text-center">Id</th>
							<th className=" max-w-0 w-1/2 rounded-lg py-[0.1rem] text-center">
								Name
							</th>
							<th className=" w-1/25 py-[0.1rem] text-center">Quantity</th>
							<th className=" w-1/10 rounded-lg py-[0.1rem] text-center">
								Category
							</th>
							<th className=" w-1/18 py-[0.1rem] text-center">Action</th>
						</tr>
					</thead>
					<tbody className="">
						{products?.map((prod) => (
							<ListItem
								product={prod}
								key={prod.id}
								categoryDictionary={categoryDictionary}
							/>
						))}
					</tbody>
				</table>
			);
		}
	}
};
