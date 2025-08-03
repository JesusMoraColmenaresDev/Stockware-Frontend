import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { stockMovementsSchema, type StockMovementType } from "../types";
import { api } from "./axiosConfig";

export type PaginatedMovementResponse = {
	movements: StockMovementType[];
	totalPages: number;
};

const formatDateForBackend = (date: Date): string => {
	const year = date.getFullYear();
	// getMonth() devuelve 0-11, por eso se suma 1.
	// padStart(2, '0') asegura que tenga dos dígitos (ej: 07 en vez de 7).
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");

	return `${year}-${month}-${day}`;
};

export const getStockMovementsPdf = async (
	search: string = "",
	userSearch: string = "",
	categoryId: number = 0,
	startDate: Date | null,
	endDate: Date | null
) => {
	try {
		const params = new URLSearchParams();

		if (search) {
			params.append("search", search);
		}

		if (userSearch) {
			params.append("user_search", userSearch);
		}

		if (categoryId > 0) {
			params.append("category_id", categoryId.toString());
		}

		if (startDate) {
			params.append("start_date", formatDateForBackend(startDate));
		}

		if (endDate) {
			params.append("end_date", formatDateForBackend(endDate));
		}

		const response = await api.get(
			`/stock_movements.pdf?${params.toString()}`,
			{ responseType: "blob" }
		);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getStockMovements = async (
	page: number = 1,
	search: string = "",
	userSearch: string = "",
	categoryId: number = 0,
	startDate: Date | null,
	endDate: Date | null
) => {
	try {
		const params = new URLSearchParams();
		params.append("page", page.toString());

		if (search) {
			params.append("search", search);
		}

		if (userSearch) {
			params.append("user_search", userSearch);
		}

		if (categoryId > 0) {
			params.append("category_id", categoryId.toString());
		}

		if (startDate) {
			params.append("start_date", formatDateForBackend(startDate));
		}

		if (endDate) {
			params.append("end_date", formatDateForBackend(endDate));
		}

		const { data } = await api.get(`/stock_movements?${params.toString()}`);
		const totalPages = data.metadata.pages;
		const response = stockMovementsSchema.safeParse(data.data);

		if (response.success) {
			return { movements: response.data, totalPages };
		} else {
			throw new Error(response.error.message);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const useGetStockMovements = (
	page: number = 1,
	search: string = "",
	userSearch: string = "",
	categoryId: number = 0,
	startDate: Date | null,
	endDate: Date | null
) => {
	const { data, isLoading, isError } = useQuery<PaginatedMovementResponse>({
		queryKey: [
			"stockMovements",
			{ page, search, userSearch, categoryId, startDate, endDate },
		],
		queryFn: () =>
			getStockMovements(page, search, userSearch, categoryId, startDate, endDate),
		staleTime: Infinity,
		placeholderData: keepPreviousData,
	});

	return {
		stockMovements: data?.movements,
		totalPages: data?.totalPages,
		isLoadingStockMovements: isLoading,
		isErrorStockMovements: isError,
	};
};

export const formatMovementDate = (dateString: string): string => {
	const date = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	return date.toLocaleDateString(undefined, options);
};
