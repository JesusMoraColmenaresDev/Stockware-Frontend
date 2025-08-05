import { LuSearch, LuSquarePen, LuX } from "react-icons/lu";
import type { ProductType } from "../../types";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../api/productsApi";

type ProductItemProps = {
	product: ProductType;
	categoryName: string;
};

export const ProductItem = ({ product, categoryName }: ProductItemProps) => {
	const navigate = useNavigate();

	return (
		<div className="px-6 max-md:px-2 py-4 max-md:py-2 flex items-center justify-between border-b border-item/50 transition-all duration-200 hover:-translate-y-1">
			{/* Lado izquierdo: Información del producto */}
			<div className="flex items-center gap-4 max-md:gap-2 flex-1 min-w-0">
				<div className="text-sm font-mono opacity-50 w-8 text-center max-md:hidden">
					{product.id}
				</div>
				<div className="min-w-0 flex-1">
					{/* Cambios aplicados aquí: */}
					<h3
						className="text-lg max-md:text-sm font-semibold break-words line-clamp-2"
						title={product.name}
					>
						{product.name}
					</h3>
					<p className="text-sm text-accent font-bold max-md:hidden">
						{formatCurrency(product.price)}
					</p>
				</div>
			</div>

			{/* Lado derecho: Detalles y Acciones */}
			<div className="flex items-center gap-8 max-md:gap-2 ml-4 max-md:ml-2 flex-shrink-0">
				<div className="text-center w-24 max-md:hidden">
					<p className="text-xs opacity-50">Category</p>
					<p className="text-sm font-medium opacity-80 truncate" title={categoryName}>
						{categoryName}
					</p>
				</div>
				<div className="text-center w-16 max-md:hidden">
					<p className="text-xs opacity-50">Quantity</p>
					<p className="text-sm font-medium opacity-80">{product.stock}</p>
				</div>
				<div className="flex items-center justify-end gap-2 max-md:gap-1">
					<button
						onClick={() =>
							navigate(
								location.pathname + `?viewProduct=true&productId=${product.id}`
							)
						}
						className="p-2 rounded-full opacity-70 hover:opacity-100 hover:bg-white/10 hover:text-accent transition-colors"
						title="Details"
					>
						<LuSearch size={20} />
					</button>
					<button
						onClick={() =>
							navigate(
								location.pathname + `?editProduct=true&productId=${product.id}`
							)
						}
						className="p-2 rounded-full opacity-70 hover:opacity-100 hover:bg-white/10 hover:text-accent transition-colors"
						title="Modify"
					>
						<LuSquarePen size={20} />
					</button>
					<button
						onClick={() =>
							navigate(
								location.pathname +
								`?deleteProduct=true&productId=${product.id}`
							)
						}
						className="p-2 rounded-full opacity-70 hover:opacity-100 hover:bg-white/10 hover:text-bg-button-delete transition-colors"
						title="Delete"
					>
						<LuX size={20} />
					</button>
				</div>
			</div>
		</div>
	);
};
