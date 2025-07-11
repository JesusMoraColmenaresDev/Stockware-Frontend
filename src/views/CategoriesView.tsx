import { useGetCategories } from "../api/categoriesApi";
import { Spinner } from "../components/Spinner";
import { useForm } from "react-hook-form";
import { CategoriesList } from "../components/categories/CategoriesList";
import { useMemo } from "react";
import type { CategoryType } from "../types";
import { ModalButton } from "../components/modals/ModalButton";
import { SearchField } from "../components/SearchField";
import { CreateCategoryModal } from "../components/categories/CreateCategoryModal";
import { DeleteCategoryModal } from "../components/categories/DeleteCategoryModal";

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

	return (
		<div className="flex w-full h-full">
			<div className="bg-bg-main flex-1 p-2">
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
						<div className="flex flex-col px-[1rem] pb-[1rem] pt-[1.5rem] gap-[1rem]">
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
						<CategoriesList categories={filteredCategories} />
					</>
				)}
			</div>
			<CreateCategoryModal />
			<DeleteCategoryModal />
		</div>
	);
};
