import type { ProductType } from "../types";
import { type CategoryType } from "../types/index";
import { useCategoryDictionary } from "../api/categoriesApi";
import { LuSearch, LuSquarePen, LuX } from "react-icons/lu";

type ProductListProps = {
	products: ProductType[];
	categories: CategoryType[];
};

export const ProductList = ({ products, categories }: ProductListProps) => {
	const categoryDictionary = useCategoryDictionary(categories);

	{
		if (!products) return <h1>Productos No Encontrados . . .</h1>;
		return (
			<table className="w-full table-fixed border-separate border-spacing-x-[0.5rem] border-spacing-y-[0.5rem]">
				<thead>
					<tr className="text-center py-[0.1rem]">
						<th className="w-1/40">Id</th>
						<th className="w-1/2">Name</th>
						<th className="w-1/25">Quantity</th>
						<th className="w-1/10">Category</th>
						<th className="w-1/18">Action</th>
					</tr>
				</thead>
				<tbody>
					{products?.map((product) => (
						<tr>
							<td>
								<div className="flex items-center justify-center text-center">
									{product.id}
								</div>
							</td>
							<td className="w-1/2">
								<div className="flex items-center" title={`${product.name}`}>
									<span className="block truncate px-2">{product.name}</span>
								</div>
							</td>
							<td>
								<div
									className="flex items-center justify-center text-center"
									title={`${product.stock}`}
								>
									{product.stock}
								</div>
							</td>
							<td>
								<div
									className="flex items-center justify-center truncate text-center"
									title={`${categoryDictionary[product.category_id]}`}
								>
									{categoryDictionary[product.category_id]}
								</div>
							</td>
							<td>
								<div className="flex items-center justify-center h-[2rem] gap-2 ">
									<LuSearch
										className="w-[1.5rem] h-auto hover:text-accent"
										title="Details"
									/>
									<LuSquarePen
										className="w-[1.5rem] h-auto hover:text-accent"
										title="Modify"
									/>
									<LuX
										className="w-[1.5rem] h-auto hover:text-accent"
										title="Delete"
									/>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
};
