import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuCircleMinus, LuCirclePlus } from "react-icons/lu";
import ReactPaginate from "react-paginate";
import { useGetAllCategories } from "../api/categoriesApi";
import {
	formatMovementDate,
	getStockMovementsPdf,
	useGetStockMovements,
} from "../api/movementsApi";
import { formatCurrency } from "../api/productsApi";
import { CategoryDropDown } from "../components/categories/CategoryDropDown";
import { SearchField } from "../components/SearchField";
import { Spinner } from "../components/Spinner";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { usePdfDownloader } from "../hooks/usePdfDownloader";
import { getFileTimestamp } from "../utils/dateUtils";
import GenerationReportButton from "../components/GenerationReportButton";

type StockMovementsViewFormValues = {
	searchProducts: string;
	searchUsers: string;
	categoryFilter: string;
};

const defaultValues: StockMovementsViewFormValues = {
	searchProducts: "",
	searchUsers: "",
	categoryFilter: "0",
};

export const StockMovementsView = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [debouncedUserSearch, setDebouncedUserSearch] = useState("");

	// Estado para la fecha de inicio del filtro
	const [startDate, setStartDate] = useState<Date | null>(null);
	// Estado para la fecha de fin del filtro
	const [endDate, setEndDate] = useState<Date | null>(null);

	const { categories, isLoadingCategories } = useGetAllCategories();

	const { register, watch, reset, control } =
		useForm<StockMovementsViewFormValues>({
			defaultValues,
		});

	const searchProduct = watch("searchProducts");
	const searchUsers = watch("searchUsers");
	const categoryFilter = Number(watch("categoryFilter"));

	const { stockMovements, totalPages, isLoadingStockMovements } =
		useGetStockMovements(
			currentPage,
			debouncedSearch,
			debouncedUserSearch,
			categoryFilter,
			startDate,
			endDate
		);

	const handlePageClick = (event: { selected: number }) => {
		setCurrentPage(event.selected + 1);
	};

	const { isDownloading, downloadPdf } = usePdfDownloader(
		() =>
			getStockMovementsPdf(
				searchProduct,
				searchUsers,
				categoryFilter,
				startDate,
				endDate
			),
		`reporte-movimientos-${getFileTimestamp()}.pdf`
	);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchProduct);
		}, 300); // Espera 300ms después de que el usuario deja de escribir

		return () => clearTimeout(timer); // Limpia el temporizador si el usuario sigue escribiendo
	}, [searchProduct]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedUserSearch(searchUsers);
		}, 300);
		return () => clearTimeout(timer);
	}, [searchUsers]);

	// Efecto para reiniciar la paginación cuando cambian los filtros
	useEffect(() => {
		setCurrentPage(1);
	}, [debouncedSearch, debouncedUserSearch, categoryFilter]);

	return (
		<div className="flex w-full min-h-screen ">
			<div className="bg-bg-main flex-1 px-4 md:px-6 py-2 flex flex-col min-w-0 max-md:mt-18">
				{isLoadingStockMovements && !stockMovements ? (
					<div className="flex items-center justify-center h-full">
						<Spinner
							size="20rem"
							colorPrimary="#2C3E50"
							colorSecondary="#3498DB"
						/>
					</div>
				) : (
					<>
						<div className="flex pb-[1rem] pt-[1.5rem] md:z-50 gap-[8px] justify-between max-md:flex-col">
							<div className="flex w-3/7 gap-[1rem] max-md:flex-col max-md:w-full">
								<SearchField
									name="searchProducts"
									register={register}
									watch={watch}
									reset={reset}
									defaultValues={defaultValues}
									placeholder="Search By Products . . ."
								/>
								<SearchField
									name="searchUsers"
									register={register}
									watch={watch}
									reset={reset}
									defaultValues={defaultValues}
									placeholder="Search By Users . . ."
								/>
							</div>

							<div className="flex gap-[16px] max-md:flex-col">
								<div className="flex flex-col max-md:flex-row gap-[8px] justify-end max-md:justify-between">
									<DatePicker
										selected={startDate}
										onChange={(date: Date | null) => setStartDate(date)}
										selectsStart
										startDate={startDate}
										endDate={endDate}
										isClearable
										placeholderText="Start date"
										className="font-medium max-md:text-sm border border-gray-300 rounded-md bg-bg-secondary text-text"
										popperPlacement="bottom-end"
										dateFormat="dd/MM/yyyy"
									/>
									<DatePicker
										selected={endDate}
										onChange={(date: Date | null) => setEndDate(date)}
										selectsEnd
										startDate={startDate}
										endDate={endDate}
										minDate={startDate ?? undefined} // No se puede elegir una fecha final anterior a la de inicio
										isClearable
										placeholderText="End date"
										className=" border max-md:text-sm font-medium border-gray-300 rounded-md bg-bg-secondary text-text"
										popperPlacement="bottom-end"
										dateFormat="dd/MM/yyyy"
									/>
								</div>
								<div className="flex min-w-1/4 max-md:justify-between justify-end gap-[8px] z-20">
									<div className="flex justify-end w-auto py-[0.2rem] font-semibold border rounded-lg border-text bg-bg-secondary">
										<CategoryDropDown
											fieldName="categoryFilter"
											control={control}
											categories={categories ?? []}
											isLoading={isLoadingCategories}
										/>
									</div>
									{GenerationReportButton(downloadPdf, isDownloading)}
								</div>
							</div>
						</div>

						<div className="flex-1 overflow-y-auto z-10">
							<div className="flex flex-col">
								{/* Titulos */}
								<div className="px-[1rem] py-[0.5rem] sticky top-0 bg-bg-main z-10">
									<div className="flex max-md:hidden gap-[1rem] items-center">
										<div className="flex gap-[0.5rem] w-1/20 justify-center items-end">
											<div className=" flex w-1/2 max-md:text-sm justify-center items-center text-text opacity-40">
												ID
											</div>
											<div className="flex w-1/2 max-md:text-sm justify-center items-center text-text font-semibold">
												Type
											</div>
										</div>
										<div className="flex max-md:text-sm justify-between w-4/10 text-text font-semibold">
											<span className="flex items-center">Product</span>
										</div>
										<div className="flex w-1/10 max-md:text-sm justify-center items-center text-text font-semibold">
											Value
										</div>
										<div className="flex max-md:text-sm justify-center items-center w-1/10 text-text font-semibold">
											<span className="text-center break-words">
												Historical Price
											</span>
										</div>
										<div className="flex w-1/10 max-md:text-sm justify-center items-center text-text font-semibold">
											Quantity
										</div>
										<div className="flex max-md:text-sm justify-center items-center w-3/20 text-text font-semibold">
											User
										</div>
										<div className="flex max-md:text-sm justify-center items-center w-1/10 text-text font-semibold">
											<span className="text-center break-words">Date</span>
										</div>
									</div>
								</div>

								{stockMovements?.map((movement) => (
									<div
										key={movement.id}
										className="px-[1rem] py-[0.5rem] border-b border-item/50"
									>
										<div className="flex gap-[1rem] items-center max-md:flex-col max-md:gap-1">
											{/* ID + Type */}
											<div className="flex gap-[1rem] w-1/20 min-w-0 justify-center items-center">
												<div className="max-md:hidden flex items-center justify-center text-text opacity-40">
													{movement.id}
												</div>
												<div className="flex flex-col justify-center items-center text-text font-semibold">
													{movement.movement > 0 ? (
														<>
															<LuCirclePlus
																className="h-[1.5rem] w-auto text-green-500 max-md:h-[1rem]"
																focusable="false"
															/>
															<h3 className="max-md:hidden">Entry</h3>
														</>
													) : (
														<>
															<LuCircleMinus
																className="h-[1.5rem] w-auto text-red-500 max-md:h-[1rem]"
																focusable="false"
															/>
															<h3 className="max-md:hidden">Exit</h3>
														</>
													)}
												</div>
											</div>

											{/* Product */}
											<div className="flex flex-col w-4/10 max-md:w-full min-w-0 font-semibold gap-[0.5rem]">
												<div
													className="flex justify-start max-md:justify-center items-start font-semibold min-w-0"
													title={movement.product.name}
												>
													<span className="text-lg max-md:text-sm max-md:text-center font-semibold break-words line-clamp-2">
														{movement.product.name}
													</span>
												</div>
												<div className="flex text-text gap-[0.5rem] opacity-60 max-md:hidden">
													<span>Category:</span>
													<span className="truncate max-md:text-sm max-md:hidden">
														{movement.product.category?.name ?? "N/A"}
													</span>
												</div>
											</div>

											{/* Value */}
											<div className="flex gap-1 max-md:w-full max-md:justify-between w-1/10 min-w-0 justify-center items-center max-md:text-sm font-semibold text-lg">
												<span className="md:hidden font-bold opacity-70">
													Value:
												</span>
												<span
													className={`max-md:text-sm ${
														movement.movement > 0
															? "text-green-500"
															: "text-red-500"
													}`}
												>
													{formatCurrency(
														Math.abs(movement.movement) * (movement.price ?? 0)
													)}
												</span>
											</div>

											{/* Historical Price */}
											<div className="flex gap-1 w-1/10 max-md:justify-between max-md:w-full max-md:text-sm min-w-0 justify-center items-center font-semibold text-lg">
												<span className="md:hidden font-bold opacity-70">
													Hist. Price:
												</span>
												<span className="max-md:text-sm text-accent">
													{formatCurrency(movement.price ?? 0)}
												</span>
											</div>

											{/* Quantity */}
											<div className="flex gap-1 w-1/10 max-md:justify-between max-md:w-full min-w-0 max-md:text-sm justify-center items-center font-semibold text-lg">
												<span className="md:hidden font-bold opacity-70">
													Quantity:
												</span>
												<span
													className={`max-md:text-sm ${
														movement.movement > 0
															? "text-green-500"
															: "text-red-500"
													}`}
												>
													{movement.movement}
												</span>
											</div>

											{/* User */}
											<div
												className={`flex justify-center max-md:justify-between gap-1 max-md:text-sm items-center max-md:w-full w-3/20 min-w-0 text-text font-semibold`}
												title={`${movement.user.name}${
													!movement.user.is_enabled ? " (Disabled)" : ""
												}`}
											>
												<span className="md:hidden font-bold opacity-70">
													User:
												</span>
												<span
													className={`truncate max-md:text-sm ${
														!movement.user.is_enabled
															? "opacity-50 line-through"
															: ""
													}`}
												>
													{movement.user.name}
												</span>
											</div>

											{/* Date */}
											<div className="flex justify-center max-md:justify-between gap-1 items-center max-md:w-ful w-1/10 max-md:w-full min-w-0 text-text font-semibold">
												<span className="md:hidden font-bold opacity-70">
													Date:
												</span>

												<span className="text-center break-words max-md:text-sm">
													{formatMovementDate(movement.created_at)}
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						<ReactPaginate
							breakLabel="..."
							nextLabel="Siguiente >"
							onPageChange={handlePageClick}
							pageRangeDisplayed={3}
							marginPagesDisplayed={2}
							pageCount={totalPages ?? 0}
							forcePage={currentPage - 1}
							previousLabel="< Anterior"
							renderOnZeroPageCount={null}
							containerClassName=" flex items-center justify-center p-4 gap-2 text-lg max-md:text-sm text-text"
							pageClassName="w-10 h-10  flex items-center justify-center rounded-md"
							pageLinkClassName="cursor-pointer max-md:text-sm w-full h-full flex items-center justify-center"
							previousClassName="px-4 py-2 rounded-md max-md:text-sm"
							nextClassName="px-4 py-2 rounded-md"
							activeClassName="font-bold"
							disabledClassName="opacity-50 cursor-not-allowed"
						/>
					</>
				)}
			</div>
		</div>
	);
};
