import { getProductsPdf, useGetProducts } from "../api/productsApi";
import { Spinner } from "../components/Spinner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { CategoryDropDown } from "../components/categories/CategoryDropDown";
import {
	useCategoryDictionary,
	useGetAllCategories,
} from "../api/categoriesApi";
import { RightSideBar } from "./RightSideBar";
import { ModalButton } from "../components/modals/ModalButton";
import { SearchField } from "../components/SearchField";
import { DeleteProductModal } from "../components/products/DeleteProductModal";
import { CreateProductModal } from "../components/products/CreateProductModal";
import { ProductItem } from "../components/products/ProductItem";
import { EditProductModal } from "../components/products/EditProductModal";
import { ProductDetailsModal } from "../components/products/ProductDetailsModal";
import ReactPaginate from "react-paginate";
import { usePdfDownloader } from "../hooks/usePdfDownloader";
import { getFileTimestamp } from "../utils/dateUtils";
import GenerationReportButton from "../components/GenerationReportButton";

export type HomePageViewFormValues = {
	searchProducts: string;
	categoryFilter: string;
};

const defaultValues: HomePageViewFormValues = {
	searchProducts: "",
	categoryFilter: "0",
};

export default function HomePageView() {
	const [currentPage, setCurrentPage] = useState(1);
	const [debouncedSearch, setDebouncedSearch] = useState("");

	const handlePageClick = (event: { selected: number }) => {
		setCurrentPage(event.selected + 1);
	};

	const { isDownloading, downloadPdf } = usePdfDownloader(
		() => getProductsPdf(searchProduct, categoryFilter),
		`reporte-productos-${getFileTimestamp()}.pdf`
	);

	const {
		register,
		watch,
		reset: resetSearch,
	} = useForm<HomePageViewFormValues>({
		defaultValues, // Evitamos los Undefined, al tener un valor de antemano
	});

	const searchProduct = watch("searchProducts");
	const categoryFilter = Number(watch("categoryFilter"));

	const { products, isLoadingProducts, totalPages } = useGetProducts(
		currentPage,
		debouncedSearch,
		categoryFilter
	);
	const { categories, isLoadingCategories } = useGetAllCategories();
	const categoryDictionary = useCategoryDictionary(categories ?? []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchProduct);
		}, 300); // Espera 300ms después de que el usuario deja de escribir

		return () => clearTimeout(timer); // Limpia el temporizador si el usuario sigue escribiendo
	}, [searchProduct]);

	// Efecto para reiniciar la paginación cuando cambian los filtros
	useEffect(() => {
		setCurrentPage(1);
	}, [debouncedSearch, categoryFilter]);

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
							<div className="flex w-3/4 gap-[1rem]">
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
							<div className="flex flex-1/2 justify-end gap-[8px]">
								<div className="flex justify-end w-auto px-[1rem] py-[0.2rem] font-semibold border rounded-lg border-text bg-bg-secondary">
									<CategoryDropDown
										register={register}
										categories={categories ?? []}
										isLoading={isLoadingCategories}
									/>
								</div>
								{GenerationReportButton(downloadPdf, isDownloading)}
							</div>
						</div>

						{products && !isLoadingCategories && (
							<div className="flex-1 overflow-y-auto">
								<div className="flex flex-col">
									{products.map((product) => (
										<ProductItem
											key={product.id}
											product={product}
											categoryName={
												categoryDictionary[product.category_id] ?? "N/A"
											}
										/>
									))}
								</div>
							</div>
						)}

						<ReactPaginate
							breakLabel="..."
							nextLabel="Siguiente >"
							onPageChange={handlePageClick}
							pageRangeDisplayed={3}
							marginPagesDisplayed={2}
							pageCount={totalPages ?? 0}
							forcePage={currentPage - 1}
							previousLabel="< Anterior"
							renderOnZeroPageCount={null}
							containerClassName="flex items-center justify-center p-4 gap-2 text-lg text-text"
							pageClassName="w-10 h-10  flex items-center justify-center rounded-md"
							pageLinkClassName="cursor-pointer w-full h-full flex items-center justify-center"
							previousClassName={`px-4 py-2 rounded-md ${
								currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
							}`}
							nextClassName={`px-4 py-2 rounded-md ${
								currentPage === totalPages
									? "cursor-not-allowed"
									: "cursor-pointer"
							}`}
							activeClassName="font-bold cursor-pointer"
							disabledClassName="opacity-50 cursor-not-allowed"
						/>
					</>
				)}
			</div>
			<CreateProductModal />
			<ProductDetailsModal />
			<EditProductModal />
			<DeleteProductModal />
			<RightSideBar products={products} isLoadingProducts={isLoadingProducts} />
		</div>
	);
}
