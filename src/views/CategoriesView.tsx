import { useGetCategories } from "../api/categoriesApi";
import { Spinner } from "../components/Spinner";
import { useForm } from "react-hook-form";
import { CategoriesList } from "../components/CategoriesList";
import { useMemo } from "react";
import type { CategoryType } from "../types";
import { CreateButton } from "../components/CreateButton";
import { SearchField } from "../components/SearchField";

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
								<CreateButton name="Category" path="/categories/create" />
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
						<CategoriesList categories={filteredCategories} />
					</>
				)}
			</div>
		</div>

		/* 		<div className="flex w-full h-full">
			<div className="bg-bg-main p-[1rem] border-accent border-8">
				{isLoadingCategories ? (
					<div className="flex items-center justify-center min-h-screen">
						<Spinner
							size="20rem"
							colorPrimary="#2C3E50"
							colorSecondary="#3498DB"
						/>
						WOW
					</div>
				) : (!categories) ? : (
					<span>Error?</span>
				) : (
					<div className="flex items-center px-[0.5rem] pb-[1rem] pt-[1.5rem]">
						<div className="flex flex-1/2 gap-[1rem] items-center">
							<h1 className="text-2xl font-bold">
								Categories <span>{categories.length}</span>
							</h1>
						</div>
						<div className="flex flex-1/2 gap-[1rem] items-center">
							<button
								className="flex px-[2rem] py-[1rem] justify-start rounded-lg bg-bg-button-primary text-bg-secondary font-bold hover:bg-bg-button-secondary text-lg"
								onClick={() => navigate("/categories/create")}
							>
								Create Category
							</button>
							<div className="flex w-3/5 items-center">
								<input
									type="text"
									id="searchCategory"
									placeholder="Search Categories . . ."
									{...register("searchCategory")}
									className="flex px-[1rem] w-full py-[1rem] justify-start bg-bg-secondary text-text backdrop-opacity-40 font-medium rounded-lg border-text border"
								/>
								{searchCategory && (
									<button onClick={() => resetSearch({ searchCategory: "" })}>
										<LuX className="text-text w-auto h-[1.5rem] rounded-4xl hover:border-1" />
									</button>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>

 */
	);
};
