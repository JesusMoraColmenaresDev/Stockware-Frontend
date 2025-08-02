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

	const { register, watch, reset } = useForm<StockMovementsViewFormValues>({
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
		<div className="flex w-full h-full ">
			<div className="bg-bg-main flex-1 px-[48px] py-2 flex flex-col min-w-0">
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
						<div className="flex pb-[1rem] pt-[1.5rem] z-50 gap-[8px] justify-between">
							<div className="flex w-3/7 gap-[1rem]">
								<SearchField
									name="searchProducts"
									register={register}
									watch={watch}
									reset={reset}
									defaultValues={defaultValues}
									placeholder="Search Products . . ."
								/>
								<SearchField
									name="searchUsers"
									register={register}
									watch={watch}
									reset={reset}
									defaultValues={defaultValues}
									placeholder="Search Users . . ."
								/>
							</div>

							<div className="flex gap-[16px]">
								<div className="flex flex-col gap-[8px] justify-end">
									<DatePicker
										selected={startDate}
										onChange={(date: Date | null) => setStartDate(date)}
										selectsStart
										startDate={startDate}
										endDate={endDate}
										isClearable
										placeholderText="Start date"
										className="p-[2px] font-medium border border-gray-300 rounded-md bg-bg-secondary text-text"
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
										className="p-[2px] border font-medium border-gray-300 rounded-md bg-bg-secondary text-text"
										dateFormat="dd/MM/yyyy"
									/>
								</div>
								<div className="flex min-w-1/4 justify-end gap-[8px]">
									<div className="flex justify-end w-auto px-4 py-4 font-semibold border rounded-lg border-text bg-bg-secondary">
										
										<CategoryDropDown
											register={register}
											categories={categories ?? []}
											isLoading={isLoadingCategories}
										/>
									</div>
									{GenerationReportButton(downloadPdf, isDownloading)}
								</div>
							</div>
						</div>

						<div className="flex-1 overflow-y-auto">
							<div className="flex flex-col">
								{/* Titulos */}
								<div className="px-[1rem] py-[0.5rem] sticky top-0 bg-bg-main z-10">
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
											Historical Price
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

								{stockMovements?.map((movement) => (
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
																className="h-[1.5rem] w-auto text-green-500"
																focusable="false"
															/>
															<h3>Entry</h3>
														</>
													) : (
														<>
															<LuCircleMinus
																className="h-[1.5rem] w-auto text-red-500"
																focusable="false"
															/>
															<h3>Exit</h3>
														</>
													)}
												</div>
											</div>
											<div className="flex flex-col w-4/10  font-semibold gap-[0.5rem]">
												<div
													className="flex justify-start items-start font-semibold"
													title={movement.product.name}
												>
													<span className="">{movement.product.name}</span>
												</div>
												<div className="flex text-text gap-[0.5rem] opacity-60">
													<span className="">Category:</span>
													<span className="truncate">
														{movement.product.category?.name ?? "N/A"}
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
														Math.abs(movement.movement) * (movement.price ?? 0)
													)}
												</span>
											</div>
											<div
												className={`flex w-1/10 justify-center items-center text-accent font-semibold text-lg`}
											>
												<span>{formatCurrency(movement.price ?? 0)}</span>
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
												className={`flex justify-center items-center w-3/20 text-text font-semibold ${
													!movement.user.is_enabled
														? "opacity-50 line-through"
														: ""
												}`}
												title={`${movement.user.name}${
													!movement.user.is_enabled ? " (Disabled)" : ""
												}`}
											>
												<span className="truncate">{movement.user.name}</span>
											</div>
											<div className="flex justify-center items-center text-text font-semibold">
												{formatMovementDate(movement.created_at)}
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
							containerClassName="flex items-center justify-center p-4 gap-2 text-lg text-text"
							pageClassName="w-10 h-10  flex items-center justify-center rounded-md"
							pageLinkClassName="cursor-pointer w-full h-full flex items-center justify-center"
							previousClassName="px-4 py-2 rounded-md"
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
