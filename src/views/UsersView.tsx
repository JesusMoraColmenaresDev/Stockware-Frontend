import { useForm } from "react-hook-form";
import { SearchField } from "../components/SearchField";
import type { UserType } from "../types";
import { UserItem } from "../components/UserItem";
import { useGetAllUsers } from "../api/usersApi";

type UsersViewFormValues = {
	searchUser: string;
};

const defaultValues: UsersViewFormValues = {
	searchUser: "",
};

export default function UsersView() {
	const { users } = useGetAllUsers();

	const {
		register,
		watch,
		reset: resetSearch,
	} = useForm<UsersViewFormValues>({
		defaultValues,
	});

	const searchUser = watch("searchUser");

	// Lógica de ejemplo para los clics en los botones
	const handleDetails = (user: UserType) =>
		alert(`Viendo detalles de ${user.name}`);
	const handleModify = (user: UserType) => alert(`Modificando a ${user.name}`);

	if (users)
		return (
			<div className="flex w-full h-full flex-col">
				<div className="flex flex-col px-[48px] pb-[1rem] pt-[1.5rem] gap-[1rem]">
					<h2 className="flex text-2xl font-bold gap-[0.75rem]">
						Users
						<span className="opacity-55"> {users.length}</span>
					</h2>

					<div className="flex w-1/2 gap-[48px] ">
						<p className="text-xl font-extrabold text-bg-button-primary">
							Admins<span className="ml-4 opacity-50">{1}</span>
						</p>
						<p className="text-xl font-extrabold">
							Users<span className="ml-4 opacity-50">{2}</span>
						</p>
					</div>

					<div className="flex w-1/2 gap-[1rem]">
						<div className="flex w-3/5">
							<SearchField
								name="searchUser"
								register={register}
								reset={resetSearch}
								watch={watch}
								placeholder="Search User by name or email..."
								defaultValues={defaultValues}
							/>
						</div>
					</div>
				</div>

				{/* Contenedor principal para la lista de usuarios */}
				<div className="bg-bg-main flex-1 px-[48px] py-[1rem] overflow-y-auto">
					<div className="flex flex-col">
						{users.map((user) => (
							<UserItem
								key={user.id}
								user={user}
								onDetailsClick={handleDetails}
								onModifyClick={handleModify}
							/>
						))}
					</div>
				</div>
			</div>
		);
}
