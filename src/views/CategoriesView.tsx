import { useGetCategories } from "../api/categoriesApi";
import { Spinner } from "../components/Spinner";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import type { CategoryType } from "../types";
import { ModalButton } from "../components/modals/ModalButton";
import { SearchField } from "../components/SearchField";
import { CreateCategoryModal } from "../components/categories/CreateCategoryModal";
import { DeleteCategoryModal } from "../components/categories/DeleteCategoryModal";
import { CategoryItem } from "../components/categories/CategoryItems";

type CategoriesViewFormValues = {
	searchCategory: string;
};

const defaultValues: CategoriesViewFormValues = {
	searchCategory: "",
};

export const CategoriesView = () => {
	const { categories, isLoadingCategories } = useGetCategories();

	const {
		register,
		watch,
		reset: resetSearch,
	} = useForm<CategoriesViewFormValues>({
		defaultValues, // Evitamos los Undefined, al tener un valor de antemano
	});
	const searchCategory = watch("searchCategory");

	const filteredCategories = useMemo<CategoryType[]>(() => {
		if (!categories) return [];

		const lower = searchCategory.trim().toLowerCase() ?? "";

		return categories.filter((category) =>
			category.name.toLowerCase().includes(lower)
		);
	}, [categories, searchCategory]);

	// Lógica de ejemplo para los clics en los botones
	const handleDetails = (category: CategoryType) =>
		alert(`Viendo detalles de ${category.name}`);
	const handleModify = (category: CategoryType) =>
		alert(`Modificando a ${category.name}`);

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
								{filteredCategories.map((category) => (
									<CategoryItem
										key={category.id}
										category={category}
										onDetailsClick={handleDetails}
										onModifyClick={handleModify}
									/>
								))}
							</div>
						</div>
					</>
				)}
			</div>
			<CreateCategoryModal />
			<DeleteCategoryModal />
		</div>
	);
};
