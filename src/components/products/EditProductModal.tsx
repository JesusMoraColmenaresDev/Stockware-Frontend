import { useForm } from "react-hook-form";
import { ModalBridge } from "../modals/ModalBridge";
import { Spinner } from "../Spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProductType } from "../../types";
import { updateProduct, useGetProducts } from "../../api/productsApi";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useGetAllCategories } from "../../api/categoriesApi";
import { ImageUploadField } from "../ImageUploadField";

type editProductForm = Pick<
	ProductType,
	"name" | "description" | "minimumQuantity" | "stock" | "price" | "category_id"
> & {
	image_url?: FileList;
};

export const EditProductModal = () => {
	const queryClient = useQueryClient();

	const [searchParams, setSearchParams] = useSearchParams();
	const productId = Number(searchParams.get("productId"));

	const { products } = useGetProducts();
	const product = useMemo(
		() => products?.find((prod) => prod.id === productId),
		[products, productId]
	);

	const { categories } = useGetAllCategories();

	const defaultValues: editProductForm = {
		name: "",
		description: "",
		minimumQuantity: 1,
		stock: 0,
		price: 0,
		category_id: 0,
		image_url: undefined,
	};

	const {
		register,
		watch,
		handleSubmit,
		reset,
		formState: { dirtyFields },
	} = useForm<editProductForm>({ defaultValues, mode: "onChange" });
	const categoryId = Number(watch("category_id"));

	const imageDirty = Boolean(dirtyFields.image_url);
	const anyDirty =
		Object.keys(dirtyFields).length > 0 &&
		(Object.keys(dirtyFields).some((f) => f !== "image_url") || imageDirty);

	const { mutate, isPending } = useMutation({
		mutationFn: (data: FormData | Partial<ProductType>) =>
			updateProduct(data, productId),
		mutationKey: ["editProduct", productId],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			searchParams.delete("editProduct");
			searchParams.delete("productId");
			setSearchParams({}, { replace: true });
			reset();
		},
		onError: () => {},
	});

	const onSubmit = (data: editProductForm) => {
		// 1) The set of keys we want to diff (everything except the file)
		const keys: Array<keyof editProductForm> = [
			"name",
			"description",
			"minimumQuantity",
			"stock",
			"price",
			"category_id",
		];

		// 2) Build a slim object of just the changed primitive fields
		const changedFields = keys.reduce<Partial<ProductType>>((acc, key) => {
			const newVal = data[key];
			const oldVal = product![key];

			// for numeric fields your form returns numbers, so strict compare
			if (newVal !== oldVal) {
				acc[key] =
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					typeof oldVal === "number" ? Number(newVal) : (newVal as any);
			}
			return acc;
		}, {});

		// 3) If the image was changed, wrap everything in FormData + the file
		if (imageDirty && data.image_url?.length) {
			const formData = new FormData();

			// append each changed field under "product[...]"
			Object.entries(changedFields).forEach(([k, v]) => {
				formData.append(`product[${k}]`, String(v));
			});

			// then append the file
			formData.append("product[image]", data.image_url[0]);
			console.log(formData);

			mutate(formData);
		} else {
			// otherwise just send JSON
			console.log(changedFields);
			mutate(changedFields);
		}
	};

	const handleCancel = () => {
		searchParams.delete("editProduct");
		searchParams.delete("productId");
		setSearchParams({}, { replace: true });
		reset();
	};

	// Whenever product arrives, reset the form
	useEffect(() => {
		if (product) {
			reset({
				name: product.name,
				description: product.description,
				minimumQuantity: product.minimumQuantity,
				stock: product.stock,
				price: product.price,
				category_id: product.category_id,
				image_url: undefined, // Reset image_url to avoid showing the old image
			});
		}
	}, [product, reset]);

	const disableButton = useMemo(() => {
		return !anyDirty || categoryId === 0 || isPending;
	}, [anyDirty, categoryId, isPending]);

	if (product)
		return (
			<ModalBridge
				title="New Product"
				titleColor="text-text"
				height="h-auto"
				width="w-2/5"
				searchParam="editProduct"
			>
				<div className="min-w-1/2 h-auto">
					<div className="flex flex-col gap-[2rem] p-[1rem]">
						<div className="flex flex-col gap-[1rem]">
							{isPending ? (
								<div className="flex flex-col items-center justify-center py-8">
									<Spinner
										size="4rem"
										colorPrimary="#2C3E50"
										colorSecondary="#3498DB"
									/>
									<span className="mt-4 text-xl font-semibold">
										Saving . . .
									</span>
								</div>
							) : (
								<>
									<form
										onSubmit={handleSubmit((data) => {
											onSubmit(data);
										})}
									>
										<h2>Name</h2>
										<input
											type="text"
											id="name"
											{...register("name")}
											className={`w-full flex p-[1rem] justify-start text-text bg-bg-secondary font-medium rounded-lg ${
												!dirtyFields.name && "opacity-40"
											}`}
										/>
										<h2>Description</h2>
										<textarea
											id="description"
											{...register("description")}
											className={`w-full flex p-[1rem] justify-start text-text bg-bg-secondary font-medium rounded-lg ${
												!dirtyFields.description && "opacity-40"
											}`}
											rows={3}
										/>
										<div className="flex flex-row gap-[2rem]">
											<div className="w-1/2">
												<div className="flex flex-col">
													<h2>Minimum Quantity</h2>
													<input
														type="number"
														id="minimumQuantity"
														{...register("minimumQuantity")}
														className={`flex p-[1rem] justify-start text-text bg-bg-secondary font-medium rounded-lg ${
															!dirtyFields.minimumQuantity && "opacity-40"
														}`}
														min={1}
													/>
												</div>
											</div>
											<div className="w-1/2">
												<div className="flex flex-col">
													<h2>Quantity</h2>
													<input
														type="number"
														id="stock"
														{...register("stock")}
														className={`flex p-[1rem] justify-start text-text bg-bg-secondary font-medium rounded-lg ${
															!dirtyFields.stock && "opacity-40"
														}`}
														min={0}
													/>
												</div>
											</div>
										</div>
										<div className="flex flex-row gap-[2rem]">
											<div className="w-1/2">
												<div className="flex flex-col">
													<h2>Price</h2>
													<input
														type="number"
														id="price"
														{...register("price")}
														className={`flex p-[1rem] justify-start text-text bg-bg-secondary font-medium rounded-lg ${
															!dirtyFields.price && "opacity-40"
														}`}
														step="0.01"
														placeholder="More or Equal to 0"
														min={0}
													/>
												</div>
											</div>
											<div className="w-1/2">
												<div className="flex flex-col">
													<h2>Category</h2>
													<div
														className={`p-[1rem] bg-bg-secondary ${
															!dirtyFields.category_id &&
															categoryId !== 0 &&
															"opacity-40"
														}`}
													>
														<select
															id="category_id"
															{...register("category_id")}
														>
															<option
																value="0"
																key={"0"}
																className="bg-bg-secondary"
															>
																All Categories
															</option>
															{categories &&
																categories.map((cat) => (
																	<option
																		value={cat.id}
																		key={cat.id}
																		className="bg-bg-secondary"
																	>
																		{cat.name}
																	</option>
																))}
														</select>
													</div>
												</div>
											</div>
										</div>
										<h2>Upload Image</h2>
										<div
											className={`flex justify-center items-center text-center h-auto w-full ${
												!imageDirty && "opacity-40"
											}`}
										>
											<ImageUploadField
												name="image_url"
												register={register}
												watch={watch}
												noImageText="No Image Changed"
											/>
										</div>
										{categoryId === 0 && (
											<div className="flex justify-center items-center w-full">
												<span className="text-red-500 text-sm mt-1">
													Please select a valid category.
												</span>
											</div>
										)}
										<div className="flex justify-between w-full mt-4">
											<button
												type="submit"
												disabled={disableButton}
												className="w-2/10 h-[2rem] text-2xl font-semibold rounded-lg bg-bg-button-primary hover:bg-bg-button-secondary text-bg-secondary disabled:opacity-20"
											>
												Save
											</button>
											<button
												type="button"
												onClick={handleCancel}
												className="w-2/10 h-[2rem] text-2xl font-semibold rounded-lg bg-bg-button-delete hover:bg-bg-button-delete-hover text-bg-secondary"
											>
												Cancel
											</button>
										</div>
									</form>
								</>
							)}
						</div>
					</div>
				</div>
			</ModalBridge>
		);
};
