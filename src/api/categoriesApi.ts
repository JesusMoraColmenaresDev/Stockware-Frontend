import { useQuery } from "@tanstack/react-query";
import { categoriesSchema, categorySchema, type CategoryType } from "../types";
import { api } from "./axiosConfig";
import { useMemo } from "react";

const mockData: CategoryType[] = [
	{
		id: 1,
		name: "Electronics",
		created_at: "2025-07-07T00:52:07.088Z",
		updated_at: "2025-07-07T00:52:07.088Z",
		products_count: 2,
	},
	{
		id: 2,
		name: "Jewelery",
		created_at: "2025-07-07T00:52:07.095Z",
		updated_at: "2025-07-07T00:52:07.095Z",
		products_count: 1,
	},
	{
		id: 3,
		name: "Men's clothing",
		created_at: "2025-07-07T00:52:07.102Z",
		updated_at: "2025-07-07T00:52:07.102Z",
		products_count: 1,
	},
	{
		id: 4,
		name: "Women's clothing",
		created_at: "2025-07-07T00:52:07.108Z",
		updated_at: "2025-07-07T00:52:07.108Z",
		products_count: 2,
	},
	{
		id: 5,
		name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni numquam vel minima facilis soluta omnis eligendi, maxime blanditiis, inventore molestias architecto aperiam corporis, sit quisquam perferendis saepe dolorem tempore ipsum.",
		created_at: "2025-07-07T00:52:07.108Z",
		updated_at: "2025-07-07T00:52:07.108Z",
		products_count: 2,
	},
];

export const getCategories = async () => {
	try {
		const { data } = await api.get("/categories");
		const response = categoriesSchema.safeParse(data);

		if (response.success) return response.data;
		else throw new Error(response.error.message);
	} catch (error) {
		console.log(error);
		return mockData;
	}
};

export const useGetCategories = () => {
	const {
		data: categories,
		isLoading: isLoadingCategories,
		isError: isCategoriesError,
	} = useQuery<CategoryType[]>({
		queryKey: ["categories"],
		queryFn: getCategories,
		staleTime: Infinity,
	});

	return { categories, isLoadingCategories, isCategoriesError };
};

export const useCategoryDictionary = (categories: CategoryType[]) =>
	useMemo<Record<number, string>>(
		() =>
			categories!.reduce((dict, category) => {
				dict[category.id] = category.name;
				return dict;
			}, {} as Record<number, string>),
		[categories]
	);

export const createCategory = async (
	newCategoryName: Pick<CategoryType, "name">
) => {
	try {
		const { data } = await api.post("/categories", {
			category: newCategoryName,
		});
		const response = categorySchema.safeParse(data);

		if (response.success) return response.data;
		else throw new Error(response.error.message);
	} catch (error) {
		console.log(error);
	}
};

export const deleteCategory = async (categoryId: CategoryType["id"]) => {
	try {
		const { data } = await api.delete<string>(`/categories/${categoryId}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};
