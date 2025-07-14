import { LuCircleArrowUp, LuSearch, LuSquarePen, LuUserX } from "react-icons/lu";
import type { UserType } from "../../types";
import { useNavigate } from "react-router-dom";
import { parseCreatedAtDate } from "../../api/usersApi";  

type UserItemProps = {
	user: UserType;
	onDetailsClick?: (user: UserType) => void;
	onModifyClick?: (user: UserType) => void;
};

export const UserItem = ({
	user
}: UserItemProps) => {
	const navigate = useNavigate();

	return (
		<div className="px-6 py-4 flex items-center justify-between border-b border-item/50 transition-all duration-200 hover:-translate-y-1">
			{/* Lado izquierdo: Información del usuario */}
			<div className="flex items-center gap-4">
				<div>
					<h3 className="text-lg truncate">{user.name}</h3>
					<p className="text-sm opacity-60">{user.email}</p>
					<p
						className={`text-sm  ${user.role === "admin" ? "text-bg-button-primary" : "text-text"} font-semibold`}
					>
						{user.role}
					</p>
				</div>
			</div>

			{/* Lado derecho: Fecha y Acciones */}
			<div className="flex items-center gap-8">
				<div className="text-center">
					<p className="text-xs opacity-50">Date Added</p>
					<p className="text-sm font-medium opacity-80">
						{parseCreatedAtDate(user.created_at)}
					</p>
				</div>
				<div className="flex items-center justify-end gap-2">
					{user.role !== "admin" && (
						<>
							<button
								onClick={() =>
									navigate(location.pathname + `?action=promote&userId=${user.id}`)
								}
									className="p-2 rounded-full opacity-70 hover:opacity-100 hover:bg-white/10 hover:text-sucess transition-colors"
									title="Promote to Admin"
								>
									<LuCircleArrowUp size={20} />
							</button>	
						</>

					)}
					<button
						onClick={() =>
							navigate(location.pathname + `?action=disable&userId=${user.id}`)
						}
						className="p-2 rounded-full opacity-70 hover:opacity-100 hover:bg-white/10 hover:text-bg-button-delete transition-colors"
						title="Disable User"
					>
						<LuUserX size={20} />
					</button>
				</div>
			</div>
		</div>
	);
};
