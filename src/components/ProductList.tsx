import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productsApi";
import { ListItem } from "./ListItem";

export const ProductList = () => {
	const { data: products } = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
		staleTime: Infinity,
	});

	return (
		<table className="table-auto border-separate border-spacing-x-5 border-spacing-y-0">
			<thead>
				<tr>
					<th>Id</th>
					<th>Name</th>
					<th>Quantity</th>
					<th className="px-5">Category</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{products?.map((prod) => (
					<ListItem product={prod} key={prod.id} />
				))}
			</tbody>
		</table>
	);
};
