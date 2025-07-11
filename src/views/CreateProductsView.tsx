import { useForm } from "react-hook-form";
import { createProduct } from "../api/productsApi";
import ProductForm from "../components/products/ProductForm";
import type { createProductType } from "../types";

export default function CreateProductsView() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<createProductType>();

	const onSubmit = async (data: any) => {
		const formData = new FormData();
		formData.append("product[name]", data.name);
		formData.append("product[price]", data.price);
		formData.append("product[description]", data.description);
		formData.append("product[category_id]", data.category_id);
		formData.append("product[stock]", data.stock);
		formData.append("product[image]", data.image[0]);
		formData.append("product[minimumQuantity]", data.minimumQuantity);

		try {
			//const response = await updateProduct(formData, 5)
			const response = await createProduct(formData);
			console.log(response);
			reset();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<ProductForm errors={errors} register={register}></ProductForm>
		</form>
	);
}
