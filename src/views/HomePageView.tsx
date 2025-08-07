import { getProductsPdf, useGetProducts } from "../api/productsApi";
import { Spinner } from "../components/Spinner";
import { useForm } from "react-hook-form";
import { Fragment, useEffect, useState } from "react";

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
import { Transition } from "@headlessui/react";
import { LuPanelRight } from "react-icons/lu";
import { usePdfDownloader } from "../hooks/usePdfDownloader";
import { getFileTimestamp } from "../utils/dateUtils";
import GenerationReportButton from "../components/GenerationReportButton";
import PaginateComponent from "../components/PaginateComponent";

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
	const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

	const handlePageClick = (event: { selected: number }) => {
		setCurrentPage(event.selected + 1);
	};

	const { isDownloading, downloadPdf } = usePdfDownloader(
		() => getProductsPdf(searchProduct, categoryFilter),
		`reporte-productos-${getFileTimestamp()}.pdf`
	);

	const {
		register,
		control,
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
		<div className="flex w-full h-full relative">
			{/* Botón para abrir RightSideBar en móvil */}
			<div className="md:hidden absolute top-8 right-4 z-20">
				<button
					onClick={() => setIsRightSidebarOpen(true)}
					className="p-2 rounded-md bg-bg-nav text-white shadow-lg"
					aria-label="Abrir barra lateral de notificaciones"
				>
					<LuPanelRight size={24} />
				</button>
			</div>

			{/* Contenido Principal */}
			<div className="bg-bg-main flex-1 px-4 md:px-6 py-2 flex flex-col min-w-0">
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
						<div className="flex pb-[1rem] pt-[1.5rem] gap-[8px] max-md:mt-18 max-md:flex-col">
							<div className="flex w-3/4 gap-[8px] max-md:justify-between max-md:w-full max-md:flex-col ">
								<ModalButton
									text="Create Product"
									searchParam={"newProduct"}
									openModal={true}
									classNameInyect="max-md:text-sm max-md:px-[1rem] max-md:py-[0.5rem] px-[2rem] py-[1rem] text-lg font-bold"
									disabled={false}
								/>
								<div className="flex w-3/5 max-md:w-full">
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
							<div className="flex flex-[50%] max-md:justify-between justify-end gap-[8px]">
								<div className="flex items-center text-left justify-end w-auto px-[1rem] py-[0.2rem] font-semibold border rounded-lg border-text bg-bg-secondary">
									<CategoryDropDown
										fieldName="categoryFilter"
										control={control}
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

						<PaginateComponent totalPages = {totalPages} currentPage = {currentPage} handlePageClick = {handlePageClick}></PaginateComponent>
					</>
				)}
			</div>
			<CreateProductModal
				page={currentPage}
				search={debouncedSearch}
				categoryIdKey={categoryFilter}
			/>
			<ProductDetailsModal />
			<EditProductModal
				page={currentPage}
				search={debouncedSearch}
				categoryIdKey={categoryFilter}
			/>
			<DeleteProductModal
				page={currentPage}
				search={debouncedSearch}
				categoryIdKey={categoryFilter}
				setCurrentPage ={setCurrentPage}
			/>

			{/* Right Sidebar para Desktop */}
			<div className="hidden md:block">
				<RightSideBar
					products={products}
					isLoadingProducts={isLoadingProducts}
				/>
			</div>

			{/* Right Sidebar para Móvil*/}
			<Transition show={isRightSidebarOpen} as={Fragment}>
				{/* Overlay */}
				<Transition.Child
					as={Fragment}
					enter="transition-opacity ease-linear duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div
						className="fixed inset-0 bg-black/50 z-40 md:hidden"
						onClick={() => setIsRightSidebarOpen(false)}
					/>
				</Transition.Child>

				{/* Sidebar */}
				<Transition.Child
					as="div"
					className="fixed top-0 right-0 h-full z-50 md:hidden"
					enter="transition ease-in-out duration-200 transform"
					enterFrom="translate-x-full"
					enterTo="translate-x-0"
					leave="transition ease-in-out duration-200 transform"
					leaveFrom="translate-x-0"
					leaveTo="translate-x-full"
				>
					<RightSideBar
						products={products}
						isLoadingProducts={isLoadingProducts}
					/>
				</Transition.Child>
			</Transition>
		</div>
	);
}
