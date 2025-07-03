import { getProducts } from "../api/productsApi";
import { ProductList } from "../components/ProductList";
import { useQuery } from "@tanstack/react-query";

export default function HomePageView() {
	const { data: products } = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
		staleTime: Infinity,
	});

	return (
		<div className="bg-bg-main">
			{products ? (
				products.map((prod) => (
					<div className="flex pl-[2rem] justify-between" key={prod.id}>
						<div>{prod.name}</div>
						<img
							src={prod.image_url}
							className="h-[2rem] w-auto"
							alt={String(prod.id)}
						/>
					</div>
				))
			) : (
				<p className="">Loading . . .</p>
			)}

			<div></div>

			<div>
				<ProductList />
			</div>
		</div>
	);
}
