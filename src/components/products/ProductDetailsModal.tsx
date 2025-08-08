import { useGetProductById } from "../../api/productsApi";
import { ModalBridge } from "../modals/ModalBridge";
import { useSearchParams } from "react-router-dom";
import {
	useCategoryDictionary,
	useGetAllCategories,
} from "../../api/categoriesApi";

export const ProductDetailsModal = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const productId = Number(searchParams.get("productId"));

	// console.log("productId", productId);

	const { product } = useGetProductById(productId, productId > 0);

	const { categories } = useGetAllCategories();
	const categoryDictionary = useCategoryDictionary(categories ?? []);

	const goToEditProduct = () => {
		searchParams.delete("viewProduct");
		searchParams.delete("productId");
		searchParams.set("editProduct", "true");
		searchParams.set("productId", String(productId));
		setSearchParams(searchParams, { replace: true });
	};

	const handleCancel = () => {
		searchParams.delete("viewProduct");
		searchParams.delete("productId");
		setSearchParams({}, { replace: true });
	};

	if (product)
		return (
			<ModalBridge
				height="h-auto"
				width="w-5/10"
				searchParam="viewProduct"
				title="Product Information"
				titleColor="text-text"
			>
				<div className="min-w-1/2 h-auto">
					<div className="flex flex-col gap-[2rem] p-[1rem]">
						<div className="flex flex-col gap-[1rem]">
							<div>
								<h2 className="text-sm">Name</h2>
								<div
									className="w-full flex p-[1rem] justify-start text-text bg-bg-secondary font-medium rounded-lg"
									title={product.name}
								>
									{product.name}
								</div>
							</div>

							<div>
								<h2 className="text-sm">Description</h2>
								<p
									className="w-full max-md:sm h-20 overflow-y-auto resize-none p-[1rem] text-text bg-bg-secondary font-medium rounded-lg"
									title={product.description}
								>
									{product.description}
								</p>
							</div>

							<div className="flex flex-row gap-[2rem]">
								<div className="w-1/2">
									<div className="flex flex-col">
										<h2 className="text-sm">Minimum Quantity</h2>
										<div className="w-full flex p-[1rem] justify-start text-text bg-bg-secondary font-medium rounded-lg">
											<span className="font-bold">
												{product.minimumQuantity}
											</span>
										</div>
									</div>
								</div>
								<div className="w-1/2">
									<div className="flex flex-col">
										<h2 className="text-sm">Quantity</h2>
										<div className="w-full flex p-[1rem] justify-start text-text bg-bg-secondary font-medium rounded-lg">
											<span className="font-bold">{product.stock}</span>
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-row gap-[2rem]">
								<div className="w-1/2">
									<div className="flex flex-col">
										<h2 className="text-sm">Price</h2>
										<div className="w-full flex p-[1rem] justify-start text-text bg-bg-secondary font-medium rounded-lg">
											<span className="font-bold">{product.price}</span>
										</div>
									</div>
								</div>
								<div className="w-1/2">
									<div className="flex flex-col">
										<h2 className="text-sm">Category</h2>
										<div
											className="w-full flex p-[1rem] justify-start text-text bg-bg-secondary font-medium rounded-lg"
											title={categoryDictionary[product.category_id]}
										>
											<span>{categoryDictionary[product.category_id]}</span>
										</div>
									</div>
								</div>
							</div>
							<h2>Product Image</h2>
							<div className="w-full flex justify-center p-[1rem] text-text bg-bg-secondary font-medium rounded-lg">
								<img
									src={product.image_url}
									alt={product.name}
									title={product.name}
									className="max-h-[7rem] w-auto object-contain rounded-xl"
								/>
							</div>
							<div className="flex justify-between w-full mt-4 max-md:flex-col max-md:gap-2">
								<button
									type="submit"
									onClick={goToEditProduct}
									className="max-md:w-full w-2/10 h-[2rem] text-2xl font-semibold rounded-lg bg-bg-button-primary hover:bg-bg-button-secondary text-bg-secondary disabled:opacity-20"
								>
									Edit
								</button>
								<button
									type="button"
									onClick={handleCancel}
									className="max-md:w-full w-2/10 h-[2rem] text-2xl font-semibold rounded-lg bg-bg-button-delete hover:bg-bg-button-delete-hover text-bg-secondary"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</ModalBridge>
		);
};
