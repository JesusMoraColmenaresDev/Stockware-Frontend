import { categorySchema } from "../types";
import { api } from "./axiosConfig";

export const getCategories = async () => {
	try {
		const { data } = await api.get("/categories");
		const response = categorySchema.safeParse(data);

		if (response.success) return response.data;
		else throw new Error(response.error.message);
	} catch (error) {
		console.log(error);
	}
};
