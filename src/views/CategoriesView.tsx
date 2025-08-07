import { useGetCategories } from "../api/categoriesApi";
import { Spinner } from "../components/Spinner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ModalButton } from "../components/modals/ModalButton";
import { SearchField } from "../components/SearchField";
import { CreateCategoryModal } from "../components/categories/CreateCategoryModal";
import { DeleteCategoryModal } from "../components/categories/DeleteCategoryModal";
import { CategoryItem } from "../components/categories/CategoryItems";
import ReactPaginate from "react-paginate";
import { EditCategoryModal } from "../components/categories/EditCategoryModal";
import PaginateComponent from "../components/PaginateComponent";

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

	return (
		<div className="flex h-full w-full flex-col">
			<div className="bg-bg-main flex-1 px-4 md:px-6 py-2 flex flex-col min-w-0">
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
							{/* 
								<h2 className="flex text-2xl font-bold gap-[0.75rem]">
								Categories
								<span className="opacity-55"> {categories.length}</span>
							</h2> 
							*/}
							<div className="flex w-1/2 gap-[1rem] max-md:mt-18 max-md:flex-col max-md:justify-between max-md:w-full">
								<ModalButton
									text="Create Category"
									searchParam={"newCategory"}
									openModal={true}
									classNameInyect="max-md:text-sm max-md:px-[1rem] max-md:py-[0.5rem] px-[2rem] py-[1rem] text-lg font-bold"
									disabled={false}
								/>
								<div className="flex w-3/5 max-md:w-full">
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
									<CategoryItem key={category.id} category={category} />
								))}
							</div>
						</div>

						<PaginateComponent totalPages = {totalPages} currentPage = {currentPage} handlePageClick = {handlePageClick}></PaginateComponent>
						
					</>
				)}
			</div>
			<CreateCategoryModal page={currentPage} search={debouncedSearch} />
			<EditCategoryModal page={currentPage} search={debouncedSearch} />
			<DeleteCategoryModal
				page={currentPage}
				search={debouncedSearch}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
};
