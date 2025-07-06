import { getProducts } from "../api/productsApi";
import { ProductList } from "../components/ProductList";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../components/Spinner";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import type { ProductType } from "../types";
import { LuX } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

type FormValues = {
	search: string;
};

export default function HomePageView() {
	const navigate = useNavigate();

	const { data: products, isLoading } = useQuery<ProductType[]>({
		queryKey: ["products"],
		queryFn: getProducts,
		staleTime: Infinity,
	});

	const { register, watch, reset } = useForm<FormValues>();
	const search = watch("search");

	const filteredProducts = useMemo<ProductType[]>(() => {
		if (!products) return [];
		if (!search) return products;
		const lower = search.trim().toLowerCase();
		return products.filter((prod) => prod.name.toLowerCase().includes(lower));
	}, [products, search]);

	return (
		<div className="bg-bg-main">
			{isLoading ? (
				<div className="flex items-center justify-center min-h-screen">
					<Spinner size="20rem" colorPrimary="black" colorSecondary="orange" />
				</div>
			) : (
				<>
					<div className="flex gap-[1rem] px-[0.5rem] pb-[1rem] pt-[1.5rem]">
						<button
							className=" flex px-[2rem] py-[1rem] justify-start rounded-lg bg-bg-button-primary text-bg-secondary font-bold hover:bg-bg-button-secondary"
							onClick={() => navigate("/product/create")}
						>
							Create Product
						</button>
						<div className="flex gap-[0.2rem] w-2/5">
							<input
								type="text"
								id="search"
								{...register("search")}
								placeholder="Search products . . ."
								className="flex px-[1rem] w-2/5 py-[1rem] justify-start bg-gray-400 text-text font-medium rounded-lg"
							/>
							{search && (
								<button onClick={() => reset()}>
									<LuX className="text-text w-auto h-[1.5rem]" />
								</button>
							)}
						</div>
					</div>
					{/* {products &&
						products.map((prod) => (
							<div className="flex pl-[2rem] justify-between" key={prod.id}>
								<div>{prod.name}</div>
								<img
									src={prod.image_url}
									className="h-[2rem] w-auto"
									alt={String(prod.id)}
								/>
							</div>
						))} 
					*/}

					<div></div>

					{products && (
						<div className="p-[0.5rem]">
							<ProductList products={filteredProducts} />
						</div>
					)}
				</>
			)}
		</div>
	);
}
