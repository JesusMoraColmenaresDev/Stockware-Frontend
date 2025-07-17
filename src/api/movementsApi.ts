import { stockMovementsSchema, type StockMovementType } from "../types";
import { api } from "./axiosConfig";
import { useQuery } from "@tanstack/react-query";

const mockMovements: StockMovementType[] = [
	{
		id: 5,
		product_id: 7,
		user_id: 1,
		movement: -1,
		created_at: "2025-07-17T04:05:17.431Z",
		updated_at: "2025-07-17T04:05:17.431Z",
	},
	{
		id: 4,
		product_id: 2,
		user_id: 3,
		movement: -5,
		created_at: "2025-07-17T04:05:17.425Z",
		updated_at: "2025-07-17T04:05:17.425Z",
	},
	{
		id: 3,
		product_id: 18,
		user_id: 2,
		movement: 4,
		created_at: "2025-07-17T04:05:17.419Z",
		updated_at: "2025-07-17T04:05:17.419Z",
	},
	{
		id: 2,
		product_id: 10,
		user_id: 3,
		movement: -3,
		created_at: "2025-07-17T04:05:17.411Z",
		updated_at: "2025-07-17T04:05:17.411Z",
	},
	{
		id: 1,
		product_id: 12,
		user_id: 3,
		movement: -9,
		created_at: "2025-07-17T04:05:17.404Z",
		updated_at: "2025-07-17T04:05:17.404Z",
	},
];

export const getStockMovements = async () => {
	try {
		const { data } = await api.get("/stock_movements");
		const response = stockMovementsSchema.safeParse(data);
		if (response.success) return response.data;
		else {
			throw new Error(response.error.message);
		}
	} catch (error) {
		console.log(error);
		return mockMovements;
	}
};

export const useGetStockMovements = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["stockMovements"],
		queryFn: getStockMovements,
		staleTime: Infinity,
	});

	return {
		stockMovements: data,
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
