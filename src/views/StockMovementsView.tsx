import { Spinner } from "../components/Spinner";
import { formatMovementDate, useGetStockMovements } from "../api/movementsApi";
import { SearchField } from "../components/SearchField";
import { ModalButton } from "../components/modals/ModalButton";
import { CategoryDropDown } from "../components/categories/CategoryDropDown";
import { useForm } from "react-hook-form";
import {
	formatCurrency,
	useGetProducts,
	useProductDictionary,
} from "../api/productsApi";
import { useMemo } from "react";
import type { ProductType } from "../types";
import { LuCircleMinus, LuCirclePlus } from "react-icons/lu";
import { useGetAllUsers } from "../api/usersApi";
import { useCategoryDictionary, useGetCategories } from "../api/categoriesApi";

type StockMovementsViewFormValues = {
	searchProducts: string;
	categoryFilter: string;
};

const defaultValues: StockMovementsViewFormValues = {
	searchProducts: "",
	categoryFilter: "0",
};

export const StockMovementsView = () => {
	const { products, isLoadingProducts } = useGetProducts();
	const productDictionary = useProductDictionary(products ?? []);

	const { categories } = useGetCategories();
	const categoriesDictionary = useCategoryDictionary(categories ?? []);

	const { stockMovements, isLoadingStockMovements } = useGetStockMovements();
	console.log(stockMovements);

	const { users, isLoadingUsers } = useGetAllUsers();

	const { register, watch, reset } = useForm<StockMovementsViewFormValues>({
		defaultValues,
	});

	const searchProduct = watch("searchProducts");

	const categoryFilter = Number(watch("categoryFilter"));

	const filteredProducts = useMemo<ProductType[]>(() => {
		if (!products) return [];

		const lower = searchProduct.trim().toLowerCase() ?? ""; // Si no esta, pongalo como string vacio

		return products
			.filter(
				(prod) =>
					categoryFilter > 0 // El usuario escogio una opcion del select
						? prod.category_id == categoryFilter // Solo los de la misma ID
						: true // Si no, solo retorne todos
			)
			.filter((prod) => prod.name.toLowerCase().includes(lower));
	}, [products, searchProduct, categoryFilter]);

	const getFilteredProductIds = (products: ProductType[]): number[] => {
		const uniqueIds = new Set<number>();
		products.forEach((product) => {
			uniqueIds.add(product.id);
		});
		return Array.from(uniqueIds).sort((a, b) => a - b);
	};

	const filteredProductIds = useMemo(() => {
		return getFilteredProductIds(filteredProducts);
	}, [filteredProducts]);

	const filteredStockMovements = useMemo(() => {
		if (!stockMovements) return [];
		return stockMovements
			.filter((movement) => filteredProductIds.includes(movement.product_id))
			.sort(
				(a, b) =>
					new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
			);
	}, [stockMovements, filteredProductIds]);

	return (
		<div className="flex w-full h-full ">
			<div className="bg-bg-main flex-1 px-[48px] py-2 flex flex-col min-w-0">
				{isLoadingStockMovements ? (
					<div className="flex items-center justify-center min-h-screen">
						<Spinner
							size="20rem"
							colorPrimary="#2C3E50"
							colorSecondary="#3498DB"
						/>
					</div>
				) : (
					<>
						<div className="flex pb-[1rem] pt-[1.5rem]">
							<div className="flex w-3/4 gap-[1rem]">
								<ModalButton
									text="Record Movement"
									searchParam={"newMovement"}
									openModal={true}
									classNameInyect="px-[2rem] py-[1rem] text-lg font-bold"
									disabled={false}
								/>
								<div className="flex w-3/5">
									<SearchField
										name="searchProducts"
										register={register}
										watch={watch}
										reset={reset}
										defaultValues={defaultValues}
										placeholder="Search Products . . ."
									/>
								</div>
							</div>
							<div className="flex w-1/4 justify-end">
								<div className="flex justify-end w-auto px-[1rem] py-[0.2rem] font-semibold border rounded-lg border-text bg-bg-secondary">
									<CategoryDropDown register={register} />
								</div>
							</div>
						</div>

						{filteredStockMovements &&
							filteredProducts &&
							users &&
							!isLoadingStockMovements &&
							!isLoadingProducts &&
							!isLoadingUsers && (
								<div className="flex-1 overflow-y-auto">
									<div className="flex flex-col">
										{/* Titulos */}

										<div className="px-[1rem] py-[0.5rem]">
											<div className="flex gap-[1rem] items-center">
												<div className="flex gap-[0.5rem] w-1/20 justify-center items-end">
													<div className="flex w-1/2 justify-center items-center text-text opacity-40">
														ID
													</div>
													<div className="flex w-1/2 justify-center items-center text-text font-semibold">
														Type
													</div>
												</div>
												<div className="flex justify-between w-4/10 text-text font-semibold">
													<span className="flex items-center">Product</span>
												</div>
												<div className="flex w-1/10 justify-center items-center text-text font-semibold">
													Value
												</div>
												<div className="flex w-1/10 justify-center items-center text-text font-semibold">
													Quantity
												</div>
												<div className="flex justify-center items-center w-3/20 text-text font-semibold">
													User
												</div>
												<div className="flex justify-center items-center w-1/10 text-text font-semibold">
													Date
												</div>
											</div>
										</div>
										{filteredStockMovements.map((movement) => (
											<div
												key={movement.id}
												className="px-[1rem] py-[0.5rem] border-b border-item/50 transition-all duration-200 hover:-translate-y-1"
											>
												<div className="flex gap-[1rem] items-center">
													<div className="flex gap-[1rem] w-1/20 justify-center items-center">
														<div className="flex items-center justify-center text-text opacity-40">
															{movement.id}
														</div>
														<div className="flex flex-col justify-center items-center text-text font-semibold">
															{movement.movement > 0 ? (
																<>
																	<LuCirclePlus
																		className="h-[1.5rem] w-auto"
																		focusable="false"
																	/>
																	<h3>Entry</h3>
																</>
															) : (
																<>
																	<LuCircleMinus
																		className="h-[1.5rem] w-auto"
																		focusable="false"
																	/>
																	<h3>Exit</h3>
																</>
															)}
														</div>
													</div>
													<div className="flex flex-col w-4/10 text-text font-semibold gap-[0.5rem]">
														<div
															className="flex justify-start items-start text-text font-semibold"
															title={productDictionary[movement.product_id]}
														>
															<span className="truncate">
																{productDictionary[movement.product_id]}
															</span>
														</div>
														<div className="flex text-text gap-[0.5rem] opacity-60">
															<span className="">Category:</span>
															<span className="truncate">
																{
																	categoriesDictionary[
																		filteredProducts.find(
																			(prod) => prod.id === movement.product_id
																		)?.category_id ?? 0
																	]
																}
															</span>
														</div>
													</div>
													<div
														className={`flex w-1/10 justify-center items-center ${
															movement.movement > 0
																? "text-green-500"
																: "text-red-500"
														} font-semibold text-lg`}
													>
														<span>
															{formatCurrency(
																Math.abs(movement.movement) *
																	(filteredProducts.find(
																		(prod) => prod.id === movement.product_id
																	)?.price ?? 0)
															)}
														</span>
													</div>
													<div
														className={`flex w-1/10 justify-center items-center ${
															movement.movement > 0
																? "text-green-500"
																: "text-red-500"
														} font-semibold text-lg`}
													>
														<span>{movement.movement}</span>
													</div>
													<div
														className={`flex justify-center items-center w-3/20 ${
															users[movement.user_id - 1]?.is_enabled
																? "text-text"
																: "text-red-500 opacity-40"
														} font-semibold`}
														title={users[movement.user_id - 1]?.name}
													>
														{users[movement.user_id - 1]?.name}
													</div>
													<div className="flex justify-center items-center w-1/10 text-text font-semibold">
														{formatMovementDate(movement.created_at)}
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							)}
					</>
				)}
			</div>
		</div>
	);
};
