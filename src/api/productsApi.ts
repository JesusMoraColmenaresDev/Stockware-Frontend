import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { productSchema, productsSchema, type ProductType } from "../types";
import { api } from "./axiosConfig";
import { useMemo } from "react";

const mockData: ProductType[] = [
	{
		id: 1,
		name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
		price: 109.95,
		created_at: "2025-07-07T00:52:08.015Z",
		updated_at: "2025-07-07T00:52:08.698Z",
		description:
			"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
		category_id: 1,
		stock: 79,
		minimumQuantity: 5,
		image_url:
			"http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6ODEsInB1ciI6ImJsb2JfaWQifX0=--a3c69cd42b3bc36a126765a6750c75c00fcb9703/fjallraven-foldsack-no-1-backpack-fits-15-laptops.jpg",
	},
	{
		id: 2,
		name: "Mens Casual Premium Slim Fit T-Shirts ",
		price: 22.3,
		created_at: "2025-07-07T00:52:08.635Z",
		updated_at: "2025-07-07T00:52:09.100Z",
		description:
			"Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
		category_id: 2,
		stock: 37,
		minimumQuantity: 2,
		image_url:
			"http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6ODIsInB1ciI6ImJsb2JfaWQifX0=--96817891912b47c6dfa6a9f916636258640644a1/mens-casual-premium-slim-fit-t-shirts.jpg",
	},
	{
		id: 3,
		name: "Mens Cotton Jacket",
		price: 55.99,
		created_at: "2025-07-07T00:52:09.072Z",
		updated_at: "2025-07-07T00:52:09.524Z",
		description:
			"great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
		category_id: 3,
		stock: 81,
		minimumQuantity: 1,
		image_url:
			"http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6ODMsInB1ciI6ImJsb2JfaWQifX0=--d9ee368410cdef800d2b88622a0a89b15b32528b/mens-cotton-jacket.jpg",
	},
	{
		id: 9999,
		name: "Mens Casual Slim Fit",
		price: 15.99,
		created_at: "2025-07-07T00:52:09.502Z",
		updated_at: "2025-07-07T00:52:09.944Z",
		description:
			"The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
		category_id: 4,
		stock: 9999,
		minimumQuantity: 2,
		image_url:
			"http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6ODQsInB1ciI6ImJsb2JfaWQifX0=--60eb5d5cbe302c91c2dd8742ea8f35fe41e909b5/mens-casual-slim-fit.jpg",
	},
	{
		id: 4,
		name: "idk",
		price: 15.99,
		created_at: "2025-07-07T00:52:09.502Z",
		updated_at: "2025-07-07T00:52:09.944Z",
		description:
			"The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
		category_id: 4,
		stock: 1,
		minimumQuantity: 20,
		image_url:
			"http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6ODQsInB1ciI6ImJsb2JfaWQifX0=--60eb5d5cbe302c91c2dd8742ea8f35fe41e909b5/mens-casual-slim-fit.jpg",
	},
	{
		id: 5,
		name: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos amet eaque asperiores fugit, error corrupti voluptatum, sed culpa libero obcaecati consequuntur facere cum veritatis eius sint ut autem delectus officiis.",
		price: 15.99,
		created_at: "2025-07-07T00:52:09.502Z",
		updated_at: "2025-07-07T00:52:09.944Z",
		description:
			"The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
		category_id: 1,
		stock: 0,
		minimumQuantity: 20,
		image_url:
			"http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6ODQsInB1ciI6ImJsb2JfaWQifX0=--60eb5d5cbe302c91c2dd8742ea8f35fe41e909b5/mens-casual-slim-fit.jpg",
	},
	// {
	// 	id: 6,
	// 	name: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos amet eaque asperiores fugit, error corrupti voluptatum, sed culpa libero obcaecati consequuntur facere cum veritatis eius sint ut autem delectus officiis.",
	// 	price: 15.99,
	// 	created_at: "2025-07-07T00:52:09.502Z",
	// 	updated_at: "2025-07-07T00:52:09.944Z",
	// 	description:
	// 		"The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
	// 	category_id: 5,
	// 	stock: 0,
	// 	minimumQuantity: 20,
	// 	image_url:
	// 		"http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6ODQsInB1ciI6ImJsb2JfaWQifX0=--60eb5d5cbe302c91c2dd8742ea8f35fe41e909b5/mens-casual-slim-fit.jpg",
	// },
];

export type PaginatedProductsResponse = {
	products: ProductType[];
	totalPages: number;
};

export const getProducts = async (page : number, search: string, categoryId: number) => {
	try {

		const params = new URLSearchParams()
		params.append("page" , page.toString())

		if(search) {
			params.append("search", search.toString())
		}

		if(categoryId > 0) {
			params.append("category_id", categoryId.toString())
		}

		const { data } = await api.get(`/products?${params.toString()}`);
		const totalPages = data.metadata.pages
		const response = productsSchema.safeParse(data.data);
		if (response.success) return {products : response.data, totalPages};
		else {
			throw new Error(response.error.message);
		}
	} catch (error) {
		console.log(error);
		throw error
	}
};

export const getProductsPdf = async (
	search: string = "",
	categoryId: number = 0
) => {
	try {
		const params = new URLSearchParams();

		if (search) {
			params.append("search", search);
		}

		if (categoryId > 0) {
			params.append("category_id", categoryId.toString());
		}

		const response = await api.get(`/products.pdf?${params.toString()}`, { responseType: "blob" });
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getProduct = async (id: number) => {
	try {
		const { data } = await api.get(`/products/${id}`);
		const response = productSchema.safeParse(data);

		if (response.success) return response.data;
		else {
			throw new Error(response.error.message);
		}
	} catch (error) {
		console.log(error);
	}
};

export const createProduct = async (data: unknown) => {
	try {
		const { data: httpsMsg } = await api.post<string>("/products", data);
		return httpsMsg;
	} catch (error) {
		console.log(error);
	}
};

export const updateProduct = async (data: unknown, id: number) => {
	try {
		const { data: httpsMsg } = await api.patch<string>(`/products/${id}`, data);
		return httpsMsg;
	} catch (error) {
		console.log(error);
	}
};

export const deleteProduct = async (id: number) => {
	try {
		const { data } = await api.delete<string>(`/products/${id}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const useGetProducts = (page : number = 1, search: string = "", categoryId : number = 0) => {
	const {
		data,
		isLoading: isLoadingProducts,
		isError: isProductsError,
	} = useQuery<PaginatedProductsResponse>({
		queryKey: ["products", page, search, categoryId],
		queryFn: () => getProducts(page, search, categoryId),
		staleTime: Infinity,
		placeholderData: keepPreviousData,
	});

	return { products: data?.products, totalPages: data?.totalPages, isLoadingProducts, isProductsError };
};

export const useProductDictionary = (products: ProductType[]) => {
	return useMemo(() => {
		const dictionary: Record<number, string> = {};
		products.forEach((product) => {
			dictionary[product.id] = product.name;
		});
		return dictionary;
	}, [products]);
};

export function formatCurrency(
	amount: number,
	currencyCode: string = "USD",
	locale?: string
): string {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: currencyCode,
	}).format(amount);
}
