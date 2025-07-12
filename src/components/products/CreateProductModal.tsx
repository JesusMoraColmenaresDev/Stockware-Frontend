import { useForm } from "react-hook-form";
import { ModalBridge } from "../modals/ModalBridge";
import type { CategoryType, ProductType } from "../../types";
import { getCategories } from "../../api/categoriesApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../api/productsApi";
import { ImageUploadField } from "../ImageUploadField";
import { ModalButton } from "../modals/ModalButton";

type createProductForm = Pick<
	ProductType,
	"name" | "description" | "minimumQuantity" | "stock" | "price" | "category_id"
> & {
	image_url: FileList;
};

export const CreateProductModal = () => {
	const queryClient = useQueryClient();

	const { data: categories } = useQuery<CategoryType[]>({
		queryKey: ["categories"],
		queryFn: getCategories,
		staleTime: Infinity,
	});

	const { watch, register } = useForm<createProductForm>();
	const name = watch("name");
	const description = watch("description");
	const minimumQuantity = watch("minimumQuantity");
	const stock = watch("stock");
	const price = watch("price");
	const category_id = Number(watch("category_id"));
	const image_url = watch("image_url"); // FileList

	const isButtonDisabled =
		name &&
		description &&
		minimumQuantity &&
		stock &&
		price &&
		category_id &&
		image_url
			? false
			: true;

	const { mutate } = useMutation({
		mutationFn: createProduct,
		mutationKey: ["newProduct", name],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onError: () => {},
	});

	const createProductFn = () => {
		const formData = new FormData();
		formData.append("product[name]", name);
		formData.append("product[price]", String(price));
		formData.append("product[description]", description);
		formData.append("product[category_id]", String(category_id));
		formData.append("product[stock]", String(stock));
		formData.append("product[image]", image_url[0]);
		formData.append("product[minimumQuantity]", String(minimumQuantity));

		mutate(formData);
	};

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
						<h2>Name</h2>
						<input
							type="text"
							id="name"
							{...register("name")}
							className="flex p-[1rem] justify-start text-text bg-bg-secondary backdrop-opacity-40 font-medium rounded-lg"
						/>
						<h2>Description</h2>
						<textarea
							id="description"
							{...register("description")}
							className="flex p-[1rem] justify-start text-text bg-bg-secondary backdrop-opacity-40 font-medium rounded-lg"
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
											<option value="0" key={"0"} className="bg-bg-secondary">
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
							/>
						</div>
						<div className="flex justify-between w-full">
							<ModalButton
								disabled={isButtonDisabled}
								openModal={true}
								text="Create"
								classNameInyect="w-2/10 h-[2rem] text-2xl font-semibold"
								clickFn={() => createProductFn()}
							/>
							<ModalButton
								disabled={false}
								openModal={false}
								text="Close"
								classNameInyect="w-2/10 h-[2rem] text-2xl font-semibold"
							/>
						</div>
					</div>
				</div>
			</div>
		</ModalBridge>
	);
};
