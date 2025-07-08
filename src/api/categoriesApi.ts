import { categoriesSchema, type CategoryType } from "../types";
import { api } from "./axiosConfig";

const mockData: CategoryType[] = [
	{
		id: 1,
		name: "Electronics",
		created_at: "2025-07-07T00:52:07.088Z",
		updated_at: "2025-07-07T00:52:07.088Z",
	},
	{
		id: 2,
		name: "Jewelery",
		created_at: "2025-07-07T00:52:07.095Z",
		updated_at: "2025-07-07T00:52:07.095Z",
	},
	{
		id: 3,
		name: "Men's clothing",
		created_at: "2025-07-07T00:52:07.102Z",
		updated_at: "2025-07-07T00:52:07.102Z",
	},
	{
		id: 4,
		name: "Women's clothing",
		created_at: "2025-07-07T00:52:07.108Z",
		updated_at: "2025-07-07T00:52:07.108Z",
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
