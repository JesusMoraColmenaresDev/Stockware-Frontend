import { getProducts } from "../api/productsApi";
import { ProductList } from "../components/ProductList";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../components/Spinner";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import type { CategoryType, ProductType } from "../types";
import { LuX } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { CategoryDropDown } from "../components/CategoryDropDown";
import { getCategories } from "../api/categoriesApi";
import { RightSideBar } from "../components/RightSideBar";

export type FormHookValues = {
	search: string;
	categoryFilter: string;
};

export default function HomePageView() {
	const navigate = useNavigate();

	const { data: products, isLoading: isLoadingProducts } = useQuery<
		ProductType[]
	>({
		queryKey: ["products"],
		queryFn: getProducts,
		staleTime: Infinity,
	});

	const { data: categories } = useQuery<CategoryType[]>({
		queryKey: ["categories"],
		queryFn: getCategories,
		staleTime: Infinity,
	});

	const { register, watch, reset: resetSearch } = useForm<FormHookValues>();
	const search = watch("search");

	const categoryFilter = Number(watch("categoryFilter"));

	const filteredProducts = useMemo<ProductType[]>(() => {
		if (!products) return [];

		const lower = search?.trim().toLowerCase() ?? ""; // Si no esta, pongalo como string vacio

		return products
			.filter(
				(prod) =>
					categoryFilter && categoryFilter !== 0 // Esta pero no es 0
						? prod.category_id == categoryFilter // Solo los de la misma ID
						: true // Si no, solo retorne todos
			)
			.filter((prod) => prod.name.toLowerCase().includes(lower));
	}, [products, search, categoryFilter]);

	return (
		<div className="flex w-full h-full ">
			<div className="bg-bg-main flex-1 p-2">
				{isLoadingProducts ? (
					<div className="flex items-center justify-center min-h-screen">
						<Spinner
							size="20rem"
							colorPrimary="#2C3E50"
							colorSecondary="#3498DB"
						/>
					</div>
				) : (
					<>
						<div className="flex px-[0.5rem] pb-[1rem] pt-[1.5rem] ">
							<div className="flex flex-1/2 gap-[1rem]">
								<button
									className="flex px-[2rem] py-[1rem] justify-start rounded-lg bg-bg-button-primary text-bg-secondary font-bold hover:bg-bg-button-secondary"
									onClick={() => navigate("/product/create")}
								>
									Create Product
								</button>
								<div className="flex w-3/5 ">
									<input
										type="text"
										id="search"
										{...register("search")}
										placeholder="Search products . . ."
										className="flex px-[1rem] w-2/2 py-[1rem] justify-start bg-bg-secondary text-text backdrop-opacity-40 font-medium rounded-lg"
									/>
									{search && (
										<button onClick={() => resetSearch({ search: "" })}>
											<LuX className="text-text w-auto h-[1.5rem]" />
										</button>
									)}
								</div>
							</div>
							<div className="flex flex-1/4 justify-end">
								<div className="flex justify-end w-auto px-[1rem] py-[0.2rem] font-semibold border rounded-lg border-text">
									<CategoryDropDown register={register} />
								</div>
							</div>
						</div>

						{products && categories && (
							<div className="p-[0.5rem]">
								<ProductList
									products={filteredProducts}
									categories={categories}
								/>
							</div>
						)}
					</>
				)}
			</div>
			<RightSideBar products={products} />
		</div>
	);
}
