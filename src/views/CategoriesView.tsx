import { useGetCategories } from "../api/categoriesApi";
import { Spinner } from "../components/Spinner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import type { CategoryType } from "../types";
import { ModalButton } from "../components/modals/ModalButton";
import { SearchField } from "../components/SearchField";
import { CreateCategoryModal } from "../components/categories/CreateCategoryModal";
import { DeleteCategoryModal } from "../components/categories/DeleteCategoryModal";
import { CategoryItem } from "../components/categories/CategoryItems";
import ReactPaginate from "react-paginate";
import { EditCategoryModal } from "../components/categories/EditCategoryModal";

type CategoriesViewFormValues = {
	searchCategory: string;
};

const defaultValues: CategoriesViewFormValues = {
	searchCategory: "",
};

export const CategoriesView = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [debouncedSearch, setDebouncedSearch] = useState("");

	const {
		register,
		watch,
		reset: resetSearch,
	} = useForm<CategoriesViewFormValues>({
		defaultValues, // Evitamos los Undefined, al tener un valor de antemano
	});
	const searchCategory = watch("searchCategory");
	const { categories, isLoadingCategories, totalPages } = useGetCategories(
		currentPage,
		debouncedSearch
	);

	const handlePageClick = (event: { selected: number }) => {
		setCurrentPage(event.selected + 1);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchCategory);
		}, 300); // Espera 300ms después de que el usuario deja de escribir

		return () => clearTimeout(timer); // Limpia el temporizador si el usuario sigue escribiendo
	}, [searchCategory]);

	// Efecto para reiniciar la paginación cuando cambian los filtros
	useEffect(() => {
		setCurrentPage(1);
	}, [debouncedSearch]);

	// Lógica de ejemplo para los clics en los botones
	const handleDetails = (category: CategoryType) =>
		alert(`Viendo detalles de ${category.name}`);

	return (
		<div className="flex w-full h-full flex-col">
			<div className="bg-bg-main flex-1 px-[48px] py-2 flex flex-col min-w-0">
				{isLoadingCategories ? (
					<div className="flex items-center justify-center h-full">
						<Spinner
							size="20rem"
							colorPrimary="#2C3E50"
							colorSecondary="#3498DB"
						/>
					</div>
				) : !categories ? (
					<div>idk Bro</div>
				) : (
					<>
						<div className="flex flex-col pb-[1rem] pt-[1.5rem] gap-[1rem]">
							<h2 className="flex text-2xl font-bold gap-[0.75rem]">
								Categories
								<span className="opacity-55"> {categories.length}</span>
							</h2>
							<div className="flex w-1/2 gap-[1rem]">
								<ModalButton
									text="Create Category"
									searchParam={"newCategory"}
									openModal={true}
									classNameInyect="px-[2rem] py-[1rem] text-lg font-bold"
									disabled={false}
								/>
								<div className="flex w-3/5">
									<SearchField
										name="searchCategory"
										register={register}
										reset={resetSearch}
										watch={watch}
										placeholder="Search Category . . ."
										defaultValues={defaultValues}
									/>
								</div>
							</div>
						</div>
						<div className="flex-1 overflow-y-auto">
							<div className="flex flex-col">
								{categories.map((category) => (
									<CategoryItem
										key={category.id}
										category={category}
									/>
								))}
							</div>
						</div>

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
							previousClassName="px-4 py-2 rounded-md"
							nextClassName="px-4 py-2 rounded-md"
							activeClassName="font-bold"
							disabledClassName="opacity-50 cursor-not-allowed"
						/>
					</>
				)}
			</div>
			<CreateCategoryModal />
			<EditCategoryModal />
			<DeleteCategoryModal />
		</div>
	);
};
