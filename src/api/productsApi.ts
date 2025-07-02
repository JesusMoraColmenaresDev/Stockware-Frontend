import { productsSchema } from "../types";
import { api } from "./axiosConfig";

export const getProducts = async () => {
	try {
		const data = await api.get("/products");
		const response = productsSchema.safeParse(data.data);

		if (response.success) return response.data;
		else {
			throw new Error(response.error.message);
		}
	} catch (error) {
		console.log(error);
	}
};

export const getProduct = async (id: number) => {
	try {
		const response = await api.get(`/products/${id}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const createProduct = async (data: any) => {
	try {
		const response = await api.post("/products", data);
	} catch (error) {
		console.log(error);
	}
};

export const updateProduct = async (data: any, id: number) => {
	try {
		const response = await api.patch(`/products/${id}`, data);
	} catch (error) {
		console.log(error);
	}
};

export const deleteProduct = async (id: number) => {
	try {
		const response = await api.delete(`/products/${id}`);
	} catch (error) {
		console.log(error);
	}
};
