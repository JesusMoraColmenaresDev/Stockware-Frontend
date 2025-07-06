import { ListItem } from "./ListItem";
import type { ProductType } from "../types";

type ProductListProps = {
	products: ProductType[];
};

export const ProductList = ({ products }: ProductListProps) => {
	{
		if (!products) {
			<h1>Productos No Encontrados . . .</h1>;
		} else {
			return (
				<table className="w-full table-fixed border border-separate border-spacing-x-[0.5rem] border-spacing-y-[0.5rem]">
					<thead className="border">
						<tr className="border">
							<th className="border w-1/40">Id</th>
							<th className="border max-w-0 w-1/2 bg-bg-secondary rounded-lg">
								Name
							</th>
							<th className="border w-1/18">Quantity</th>
							<th className="border w-1/18">Category</th>
							<th className="border w-1/13">Action</th>
						</tr>
					</thead>
					<tbody className="border">
						{products?.map((prod) => (
							<ListItem product={prod} key={prod.id} />
						))}
					</tbody>
				</table>
			);
		}
	}
};
