import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { categoriesSchema, categorySchema, type CategoryType } from "../types";
import { api } from "./axiosConfig";
import { useMemo } from "react";

export type PaginatedCategoryResponse = {
	categories: CategoryType[];
	totalPages: number;
};

export const getCategories = async (page: number = 1, search: string = "") => {
	try {
		const params = new URLSearchParams();
		params.append("page", page.toString());

		if (search) {
			params.append("search", search.toString());
		}

		console.log(params.toString());
		const { data } = await api.get(`/categories?${params.toString()}`);
		const totalPages = data.metadata.pages;
		const response = categoriesSchema.safeParse(data.data);
		if (response.success) return { categories: response.data, totalPages };
		else {
			throw new Error(response.error.message);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getAllCategories = async () => {
	try {
		const { data } = await api.get("/categories/all");
		const response = categoriesSchema.safeParse(data);
		if (response.success) return response.data;
		else throw new Error(response.error.message);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const useGetCategories = (page: number = 1, search: string = "") => {
	const {
		data,
		isLoading: isLoadingCategories,
		isError: isCategoriesError,
	} = useQuery<PaginatedCategoryResponse>({
		queryKey: ["categories", page, search],
		queryFn: () => getCategories(page, search),
		staleTime: Infinity,
		placeholderData: keepPreviousData,
	});

	return {
		categories: data?.categories,
		totalPages: data?.totalPages,
		isLoadingCategories,
		isCategoriesError,
	};
};

export const useGetAllCategories = () => {
	const {
		data: categories,
		isLoading: isLoadingCategories,
		isError: isCategoriesError,
	} = useQuery<CategoryType[]>({
		queryKey: ["categories", "all"],
		queryFn: getAllCategories,
		staleTime: Infinity,
	});

	return { categories, isLoadingCategories, isCategoriesError };
};

const getCategoryById = async (categoryId: CategoryType["id"]) => {
	try {
		const { data } = await api.get(`/categories/${categoryId}`);
		const response = categorySchema.safeParse(data);
		if (response.success) return response.data;
		else throw new Error(response.error.message);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const useGetCategoryById = (categoryId: CategoryType["id"]) => {
	const {
		data: category,
		isLoading: isLoadingCategory,
		isError: isCategoryError,
	} = useQuery<CategoryType>({
		queryKey: ["categories", categoryId],
		queryFn: () => getCategoryById(categoryId),
		staleTime: Infinity,
	});
	return { category, isLoadingCategory, isCategoryError };
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

export const updateCategory = async (
	categoryId: CategoryType["id"],
	newCategoryName: CategoryType["name"]
) => {
	try {
		const { data } = await api.patch(`/categories/${categoryId}`, {
			category: { name: newCategoryName },
		});
		const response = categorySchema.safeParse(data);
		if (response.success) return response.data;
		else throw new Error(response.error.message);
	} catch (error) {
		console.log(error);
		throw error;
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
