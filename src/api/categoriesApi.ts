import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { categoriesSchema, categorySchema, type CategoryType } from "../types";
import { api, handleApiError } from "./axiosConfig";
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

		// console.log(params.toString());
		const { data } = await api.get(`/categories?${params.toString()}`);
		const totalPages = data.metadata.pages;
		const response = categoriesSchema.safeParse(data.data);
		if (response.success) return { categories: response.data, totalPages };
		else {
			throw new Error(response.error.message); // ZOD Error
		}
	} catch (error) {
		throw handleApiError(error, "while getting the categories");
	}
};

export const getAllCategories = async () => {
	try {
		const { data } = await api.get("/categories/all");
		const response = categoriesSchema.safeParse(data);
		if (response.success) return response.data;
		else throw new Error(response.error.message); // ZOD Error
	} catch (error) {
		throw handleApiError(error, "while getting all the categories");
	}
};

export const useGetCategories = (page: number = 1, search: string = "") => {
	const {
		data,
		isLoading: isLoadingCategories,
		isError: isCategoriesError,
		error: categoriesError,
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
		categoriesError,
	};
};

export const useGetAllCategories = () => {
	const {
		data: categories,
		isLoading: isLoadingCategories,
		isError: isCategoriesError,
		error: categoriesAllError,
	} = useQuery<CategoryType[]>({
		queryKey: ["categories", "all"],
		queryFn: getAllCategories,
		staleTime: Infinity,
	});

	return {
		categories,
		isLoadingCategories,
		isCategoriesError,
		categoriesAllError,
	};
};

const getCategoryById = async (categoryId: CategoryType["id"]) => {
	try {
		const { data } = await api.get(`/categories/${categoryId}`);
		const response = categorySchema.safeParse(data);
		if (response.success) return response.data;
		else throw new Error(response.error.message); // ZOD Error
	} catch (error) {
		throw handleApiError(error, "while getting the category");
	}
};

export const useGetCategoryById = (
	categoryId: CategoryType["id"],
	enabled: boolean
) => {
	const {
		data: category,
		isLoading: isLoadingCategory,
		isError: isCategoryError,
		error: categoryError,
	} = useQuery<CategoryType>({
		queryKey: ["categories", categoryId],
		queryFn: () => getCategoryById(categoryId),
		staleTime: Infinity,
		enabled: enabled,
	});
	return { category, isLoadingCategory, isCategoryError, categoryError };
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
		else {
			throw new Error(response.error.message); // ZOD Error
		}
	} catch (error) {
		throw handleApiError(error, "while creating the category");
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
		else throw new Error(response.error.message); // ZOD Error
	} catch (error) {
		throw handleApiError(error, "while updating the category");
	}
};

export const deleteCategory = async (categoryId: CategoryType["id"]) => {
	try {
		const { data } = await api.delete<string>(`/categories/${categoryId}`);
		return data;
	} catch (error) {
		throw handleApiError(error, "while deleting the category");
	}
};
