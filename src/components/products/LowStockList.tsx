import type { ProductType } from "../../types";

type LowStockListProps = {
	lowStock: ProductType[];
};

export const LowStockList = ({ lowStock }: LowStockListProps) => {
	return (
		<div className="w-full text-black p-[0.5rem]">
			<div className="flex justify-between px-4 py-2 font-medium text-xl border-t border-text">
				<span className="w-[65%] text-left">Name</span>
				<span className="w-[35%] text-right">Quantity</span>
			</div>

			<div className="flex flex-col gap-2">
				{lowStock.map((prod) => (
					<div
						key={prod.id}
						className="flex justify-between items-center w-full px-4 py-2 mb-[0.5rem] rounded-md bg-bg-main shadow-md font-medium"
					>
						<span className="w-[65%] truncate text-left" title={prod.name}>
							{prod.name}
						</span>
						<span
							className={`w-[35%] text-right ${
								prod.stock === 0 && "text-bg-button-delete"
							}`}
							title={String(prod.stock)}
						>
							{prod.stock}
						</span>
					</div>
				))}
			</div>
		</div>
		/*
				<table className="w-full table-fixed border border-separate border-spacing-x-[0.5rem] border-spacing-y-[0.5rem] text-black">
					<thead>
						<tr className="w-full">
							<th className="text-left w-[65%] text-xl font-medium">Name</th>
							<th className="text-right text-xl font-medium w-[35%]">Quantity</th>
						</tr>
					</thead>
					<tbody>
						{lowStock.map((prod) => (
							<>
								<tr className="w-full bg-bg-main border-1 ">
									<td
										className="text-left truncate overflow-hidden whitespace-nowrap w-[65%]"
										title={`${prod.name}`}
									>
										{
										// <div className="text-left truncate overflow-hidden whitespace-nowrap shadow-[0_2px_4px_0_rgba(0,0,0,0.1)] rounded-b"></div> 
										}
										{prod.name}
									</td>
									<td className="text-right w-[35%]" title={`${prod.stock}`}>
										{prod.stock}
									</td>
								</tr>
							</>
						))}
					</tbody>
				</table> 
		*/
	);
};
