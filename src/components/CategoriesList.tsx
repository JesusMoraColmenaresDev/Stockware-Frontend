import { LuSearch, LuSquarePen, LuX } from "react-icons/lu";
import type { CategoryType } from "../types";

type CategoriesListProps = {
	categories: CategoryType[];
};
export const CategoriesList = ({ categories }: CategoriesListProps) => {
	if (!categories) return <h1>Categorias No Encontradas . . .</h1>;
	return (
		<table className="w-full table-fixed border-separate border-spacing-y-[0.5rem]">
			<thead>
				<tr className="text-center py-[0.1rem]">
					<th className="w-1/20 px-[1rem]">Id</th>
					<th className="w-1/4 px-[1rem]">Name</th>
					<th className="w-1/20 px-[1rem]"># of Products</th>
					<th className="w-1/10 px-[1rem]">Actions</th>
				</tr>
			</thead>
			<tbody>
				{categories.map((category) => (
					<tr key={category.id}>
						<td className="px-[1rem]">
							<div className="flex items-center justify-center text-center">
								{category.id}
							</div>
						</td>
						<td className="px-[1rem]">
							<div className="flex items-center justify-center" title={`${category.name}`}>
								<span className="block truncate">{category.name}</span>
							</div>
						</td>
						<td className="px-[1rem]">
							<div
								className="flex items-center justify-center text-center"
								title={`${category.products_count}`}
							>
								{category.products_count}
							</div>
						</td>
						<td className="px-[1rem]">
							<div className="flex items-center justify-center h-[2rem] gap-2">
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
};
