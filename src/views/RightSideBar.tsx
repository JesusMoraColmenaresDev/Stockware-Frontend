import { LuOctagonX, LuOctagonAlert, LuBadgeCheck } from "react-icons/lu";
import { LowStockList } from "../components/LowStockList";
import type { ProductType } from "../types";
import { Spinner } from "../components/Spinner";

type RightSideBarProps = {
	products: ProductType[] | undefined;
	isLoadingProducts: boolean;
};

export const RightSideBar = ({
	products,
	isLoadingProducts,
}: RightSideBarProps) => {
	const lowStock = products
		?.filter((prod) => prod.stock <= prod.minimumQuantity)
		.sort((a, b) => a.stock - b.stock);

	const { outOfStockCount, lowStockCount } = products?.reduce(
		(counts, prod) => {
			if (prod.stock <= prod.minimumQuantity) {
				if (prod.stock === 0) {
					counts.outOfStockCount++;
				} else {
					counts.lowStockCount++;
				}
			}
			return counts;
		},
		{ outOfStockCount: 0, lowStockCount: 0 }
	) ?? { outOfStockCount: 0, lowStockCount: 0 };

	return (
		<aside className="bg-bg-secondary min-h-screen w-sidebar-expanded text-white border-text border">
			{isLoadingProducts ? (
				<div className="flex h-full items-center justify-center w-full">
					<Spinner colorPrimary="#2C3E50" colorSecondary="#3498DB" />
				</div>
			) : outOfStockCount === 0 && lowStockCount === 0 ? (
				<div className="flex flex-col h-full w-full items-center text-sucess gap-[2rem] p-[0.5rem]">
					<LuBadgeCheck className="w-[10rem] h-auto" />
					<span className="text-center text-3xl font-semibold">
						Todos los Productos Tienen Suficiente Stock!
					</span>
				</div>
			) : (
				<>
					<div className="flex flex-col">
						<div className="flex w-auto px-[1rem] py-[0.5rem] gap-[0.6rem]">
							<div className="flex text-center text-bg-button-delete text-4xl font-medium w-1/2">
								Out of Stock
							</div>
							<div className="flex text-center text-accent text-4xl font-medium w-1/2	">
								Low Stock
							</div>
						</div>
						<div className="flex w-full gap-[0.6rem] justify-stretch">
							<div className="flex justify-center text-center items-center px-[1rem] py-[0.5rem] text-bg-button-delete w-1/2 gap-2 text-2xl font-medium">
								<LuOctagonX className="w-3/5 h-auto" />
								<span>{outOfStockCount}</span>
							</div>
							<div className="flex justify-center text-center items-center px-[1rem] py-[0.5rem] text-accent w-1/2 gap-2 text-2xl font-medium">
								<LuOctagonAlert className="w-3/5 h-auto" />
								<span>{lowStockCount}</span>
							</div>
						</div>
					</div>
					{lowStock && <LowStockList lowStock={lowStock} />}
				</>
			)}
		</aside>
	);
};
