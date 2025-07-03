import { productsSchema, type ProductType } from "../types";
import { api } from "./axiosConfig";

const mockData: ProductType[] = [
	{
		id: 1,
		// name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
		name: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
		price: 109.95,
		created_at: "2025-07-01T03:06:51.498Z",
		updated_at: "2025-07-01T03:06:52.963Z",
		description:
			"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
		category_id: 3,
		stock: 31,
		minimumQuantity: 2,
		image_url:
			"http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MSwicHVyIjoiYmxvYl9pZCJ9fQ==--5edb542126676cb1e80c0a6c102f43f63be825f0/fjallraven-foldsack-no-1-backpack-fits-15-laptops.jpg",
	},
	{
		id: 2,
		name: "Mens Casual Premium Slim Fit T-Shirts ",
		price: 22.3,
		created_at: "2025-07-01T03:06:52.853Z",
		updated_at: "2025-07-01T03:06:53.317Z",
		description:
			"Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
		category_id: 3,
		stock: 76,
		minimumQuantity: 4,
		image_url:
			"http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MiwicHVyIjoiYmxvYl9pZCJ9fQ==--4efe1666a234702bce4cc8c9bb2f65d38af262d1/mens-casual-premium-slim-fit-t-shirts.jpg",
	},
	{
		id: 9999,
		name: "Mens Cotton Jacket",
		price: 55.99,
		created_at: "2025-07-01T03:06:53.285Z",
		updated_at: "2025-07-01T03:06:53.763Z",
		description:
			"great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
		category_id: 9999,
		stock: 9999,
		minimumQuantity: 5,
		image_url:
			"http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MywicHVyIjoiYmxvYl9pZCJ9fQ==--0e533e3277834f1822c71e1045710df67ab26b41/mens-cotton-jacket.jpg",
	},
];

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
		return mockData;
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
