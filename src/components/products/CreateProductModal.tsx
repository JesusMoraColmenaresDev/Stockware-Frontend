import { useForm } from "react-hook-form";
import { ModalBridge } from "../modals/ModalBridge";
import type { CategoryType, ProductType } from "../../types";
import { getCategories } from "../../api/categoriesApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../api/productsApi";
import { ImageUploadField } from "../ImageUploadField";
import { Spinner } from "../Spinner";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

type createProductForm = Pick<
	ProductType,
	"name" | "description" | "minimumQuantity" | "stock" | "price" | "category_id"
> & {
	image_url: FileList;
};

export const CreateProductModal = () => {
	const queryClient = useQueryClient();
	const [searchParams, setSearchParams] = useSearchParams();

	const { data: categories } = useQuery<CategoryType[]>({
		queryKey: ["categories"],
		queryFn: getCategories,
		staleTime: Infinity,
	});

	const {
		watch,
		register,
		handleSubmit,
		reset,
		formState: { dirtyFields },
	} = useForm<createProductForm>();

	const categoryId = Number(watch("category_id"));
	const [saved, setSaved] = useState(false);

	const { mutate, isPending } = useMutation({
		mutationFn: createProduct,
		mutationKey: ["newProduct", watch("name")],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			setSaved(true);
			reset();
		},
		onError: () => {},
	});

	// Reset saved state when modal opens
	useEffect(() => {
		if (searchParams.get("newProduct") === "true") {
			setSaved(false);
			reset();
		}
	}, [searchParams, reset]);

	const onSubmit = (data: createProductForm) => {
		const formData = new FormData();
		formData.append("product[name]", data.name);
		formData.append("product[price]", String(data.price));
		formData.append("product[description]", data.description);
		formData.append("product[category_id]", String(data.category_id));
		formData.append("product[stock]", String(data.stock));
		formData.append("product[image]", data.image_url[0]);
		formData.append("product[minimumQuantity]", String(data.minimumQuantity));
		mutate(formData);
	};

	const handleCancel = () => {
		reset();
		searchParams.delete("newProduct");
		setSearchParams(searchParams, { replace: true });
	};

	const allFields = [
		"name",
		"description",
		"minimumQuantity",
		"stock",
		"price",
		"category_id",
		"image_url",
	] as const;
	const allDirty =
		allFields.every((field) => dirtyFields[field]) &&
		Object.keys(dirtyFields).length === allFields.length &&
		Number(watch("category_id")) !== 0;

	return (
		<ModalBridge
			title="New Product"
			titleColor="text-text"
			height="h-auto"
			width="w-2/5"
			searchParam="newProduct"
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
								<span className="mt-4 text-xl font-semibold">Saving . . .</span>
							</div>
						) : saved ? (
							<div className="flex flex-col items-center justify-center py-8">
								<span className="text-2xl font-bold text-green-600">
									Saved!
								</span>
							</div>
						) : (
							<form onSubmit={handleSubmit(onSubmit)}>
								<h2>Name</h2>
								<input
									type="text"
									id="name"
									{...register("name")}
									className="w-full flex p-[1rem] justify-start text-text bg-bg-secondary backdrop-opacity-40 font-medium rounded-lg"
								/>
								<h2>Description</h2>
								<textarea
									id="description"
									{...register("description")}
									className="w-full flex p-[1rem] justify-start text-text bg-bg-secondary backdrop-opacity-40 font-medium rounded-lg"
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
												className="flex p-[1rem] justify-start text-text bg-bg-secondary backdrop-opacity-40 font-medium rounded-lg"
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
												className="flex p-[1rem] justify-start text-text bg-bg-secondary backdrop-opacity-40 font-medium rounded-lg"
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
												className="flex p-[1rem] justify-start text-text bg-bg-secondary backdrop-opacity-40 font-medium rounded-lg"
												placeholder="More or Equal to 0"
												min={0}
											/>
										</div>
									</div>
									<div className="w-1/2">
										<div className="flex flex-col">
											<h2>Category</h2>
											<div className="p-[1rem] bg-bg-secondary">
												<select id="category_id" {...register("category_id")}>
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
								<div className="flex justify-center items-center text-center h-auto w-full">
									<ImageUploadField
										name="image_url"
										register={register}
										watch={watch}
										required={true}
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
										disabled={!allDirty}
										className="w-2/10 h-[2rem] text-2xl font-semibold rounded-lg bg-bg-button-primary hover:bg-bg-button-secondary text-bg-secondary disabled:opacity-20"
									>
										Create
									</button>
									<button
										type="button"
										onClick={handleCancel}
										className="w-2/10 h-[2rem] text-2xl font-semibold rounded-lg bg-bg-button-delete hover:bg-bg-button-delete-hover text-bg-secondary"
										disabled={isPending}
									>
										Cancel
									</button>
								</div>
							</form>
						)}
					</div>
				</div>
			</div>
		</ModalBridge>
	);
};
