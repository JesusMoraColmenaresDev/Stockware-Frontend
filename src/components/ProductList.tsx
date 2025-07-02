import { useQuery } from "@tanstack/react-query";
import { ListItem } from "./ListItem";
import type { ProductType } from "../types";

export const ProductList = () => {
	const { data: products } = useQuery<ProductType[]>({
		queryKey: ["products"], // Aprovechamos el Cache pa obtener los datos denuevo
	});

	return (
		<table className="w-full table-fixed border border-separate border-spacing-x-[0.5rem] border-spacing-y-[0.5rem]">
			<thead className="border">
				<tr className="border">
					<th className="border w-1/40">Id</th>
					<th className="border max-w-0 w-1/2 bg-bg-secondary">Name</th>
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
};
