import { useGetProducts } from "../api/productsApi";
import { ProductList } from "../components/ProductList";
import { Spinner } from "../components/Spinner";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import type { ProductType } from "../types";
import { CategoryDropDown } from "../components/CategoryDropDown";
import { useCategoryDictionary, useGetCategories } from "../api/categoriesApi";
import { RightSideBar } from "./RightSideBar";
import { ModalButton } from "../components/ModalButton";
import { SearchField } from "../components/SearchField";
import { ProductItem } from "../components/ProductItem";

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

	const { categories, isLoadingCategories } = useGetCategories();
	const categoryDictionary = useCategoryDictionary(categories ?? []);

	// Lógica de ejemplo para los clics en los botones
	const handleDetails = (product: ProductType) =>
		alert(`Viendo detalles de ${product.name}`);
	const handleModify = (product: ProductType) =>
		alert(`Modificando a ${product.name}`);
	const handleDelete = (product: ProductType) =>
		confirm(`¿Seguro que quieres eliminar a ${product.name}?`);
	

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
			<div className="bg-bg-main flex-1 px-[48px] py-2 flex flex-col min-w-0">
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
						<div className="flex pb-[1rem] pt-[1.5rem]">
							<div className="flex w-1/2 gap-[1rem]">
								<ModalButton
									text="Create Product"
									searchParam={"newProduct"}
									openModal={true}
									classNameInyect="px-[2rem] py-[1rem] text-lg font-bold"
									disabled={false}
								/>
								<div className="flex w-3/5">
									<SearchField
										name="searchProducts"
										register={register}
										watch={watch}
										reset={resetSearch}
										defaultValues={defaultValues}
										placeholder="Search Products . . ."
									/>
								</div>
							</div>
							<div className="flex w-1/4 justify-end">
								<div className="flex justify-end w-auto px-[1rem] py-[0.2rem] font-semibold border rounded-lg border-text bg-bg-secondary">
									<CategoryDropDown register={register} />
								</div>
							</div>
						</div>

						{products && !isLoadingCategories && (
							<div className="flex-1 overflow-y-auto">
								<div className="flex flex-col">
									{filteredProducts.map((product) => (
										<ProductItem
											key={product.id}
											product={product}
											categoryName={categoryDictionary[product.category_id] ?? "N/A"}
											onDetailsClick={handleDetails}
											onModifyClick={handleModify}
											onDeleteClick={handleDelete}
										/>
									))}

									
								</div>
							</div>
						)}
					</>
				)}
			</div>
			<RightSideBar products={products} isLoadingProducts={isLoadingProducts} />
		</div>
	);
}
