import { useGetProducts } from "../api/productsApi";
import { ProductList } from "../components/ProductList";
import { Spinner } from "../components/Spinner";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import type { ProductType } from "../types";
import { CategoryDropDown } from "../components/CategoryDropDown";
import { useGetCategories } from "../api/categoriesApi";
import { RightSideBar } from "./RightSideBar";
import { CreateButton } from "../components/CreateButton";
import { SearchField } from "../components/SearchField";

export type HomePageViewFormValues = {
	searchProducts: string;
	categoryFilter: string;
};

const defaultValues: HomePageViewFormValues = {
	searchProducts: "",
	categoryFilter: "0",
};

export default function HomePageView() {
	const { products, isLoadingProducts } = useGetProducts();

	const { categories } = useGetCategories();

	const {
		register,
		watch,
		reset: resetSearch,
	} = useForm<HomePageViewFormValues>({
		defaultValues, // Evitamos los Undefined, al tener un valor de antemano
	});
	const searchProduct = watch("searchProducts");

	const categoryFilter = Number(watch("categoryFilter"));

	const filteredProducts = useMemo<ProductType[]>(() => {
		if (!products) return [];

		const lower = searchProduct.trim().toLowerCase() ?? ""; // Si no esta, pongalo como string vacio

		return products
			.filter(
				(prod) =>
					categoryFilter > 0 // El usuario escogio una opcion del select
						? prod.category_id == categoryFilter // Solo los de la misma ID
						: true // Si no, solo retorne todos
			)
			.filter((prod) => prod.name.toLowerCase().includes(lower));
	}, [products, searchProduct, categoryFilter]);

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
								<CreateButton name="Product" path="/product/create" />
								<SearchField
									name="searchProducts"
									register={register}
									watch={watch}
									reset={resetSearch}
									defaultValues={defaultValues}
									placeholder="Search Products . . ."
								/>
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
			<RightSideBar products={products} isLoadingProducts={isLoadingProducts} />
		</div>
	);
}
