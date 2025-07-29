import { LuSearch, LuSquarePen, LuX } from "react-icons/lu";
import type { CategoryType } from "../../types";
import { useNavigate } from "react-router-dom";

type CategoryItemProps = {
	category: CategoryType;
	onDetailsClick?: (category: CategoryType) => void;
};

export const CategoryItem = ({
	category,
}: CategoryItemProps) => {
	const navigate = useNavigate();

	return (
		<div className="px-6 py-4 flex items-center justify-between border-b border-item/50 transition-all duration-200 hover:-translate-y-1">
			{/* Lado izquierdo: Información de la categoría */}
			<div className="flex items-center gap-4 flex-1 min-w-0">
				<div className="text-sm font-mono opacity-50 w-8 text-center">
					{category.id}
				</div>
				<div className="min-w-0 flex-1">
					<h3 className="text-lg font-semibold truncate" title={category.name}>
						{category.name}
					</h3>
				</div>
			</div>

			{/* Lado derecho: Detalles y Acciones */}
			<div className="flex items-center gap-8 ml-4 flex-shrink-0">
				<div className="text-center w-24">
					<p className="text-xs opacity-50"># of Products</p>
					<p
						className="text-sm font-medium opacity-80"
						title={String(category.products_count)}
					>
						{category.products_count}
					</p>
				</div>
				<div className="flex items-center justify-end gap-2">
					<button
						onClick={() =>
							navigate(
								location.pathname +
									`?editCategory=true&categoryId=${category.id}`
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
									`?deleteCategory=true&categoryId=${category.id}`
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
