import { useForm } from "react-hook-form";
import { SearchField } from "../components/SearchField";
import type { User } from "../types";
import { UserItem } from "../components/UserItem";

const mockUsers: User[] = [
	{
		id: 1,
		name: "Alice Smith",
		email: "alice.smith@example.com",
		role: "Admin",
		date_added: "2024-05-21",
	},
	{
		id: 2,
		name: "Bob Johnson",
		email: "bob.johnson@example.com",
		role: "User",
		date_added: "2024-05-20",
	},
	{
		id: 3,
		name: "Charlie Brown",
		email: "charlie.brown@example.com",
		role: "User",
		date_added: "2024-05-19",
	},
];

type UsersViewFormValues = {
	searchUser: string;
};

const defaultValues: UsersViewFormValues = {
	searchUser: "",
};

export default function UsersView() {
	const {
		register,
		watch,
		reset: resetSearch,
	} = useForm<UsersViewFormValues>({
		defaultValues,
	});

	const searchUser = watch("searchUser");

	// Lógica de ejemplo para los clics en los botones
	const handleDetails = (user: User) =>
		alert(`Viendo detalles de ${user.name}`);
	const handleModify = (user: User) => alert(`Modificando a ${user.name}`);

	return (
		<div className="flex w-full h-full flex-col">
			<div className="flex flex-col px-[48px] pb-[1rem] pt-[1.5rem] gap-[1rem]">
				<h2 className="flex text-2xl font-bold gap-[0.75rem]">
					Users
					<span className="opacity-55"> {mockUsers.length}</span>
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
					{mockUsers.map((user) => (
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
