import { useForm } from "react-hook-form";
import { SearchField } from "../components/SearchField";
import type { UserType } from "../types";
import { UserItem } from "../components/users/UserItem";
import { useGetAllUsers } from "../api/usersApi";
import { useMemo, useState } from "react";
import { ConfirmUserActionModal } from "../components/users/ConfirmActionModal";

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

	const filteredUsers = useMemo(() => {
    	if (!users) return [];

		const usersAvailables = users.filter((user) => user.is_enabled === true)

    	const lowerCaseSearch = searchUser.trim().toLowerCase();
		if (!lowerCaseSearch) return usersAvailables;

		return usersAvailables.filter(
			(userAvailable) =>
				userAvailable.name.toLowerCase().includes(lowerCaseSearch) ||
				userAvailable.email.toLowerCase().includes(lowerCaseSearch)
		);
	}, [users, searchUser]);


	const { adminCount, userCount } = useMemo(() => {
		if (!users) {
			return { adminCount: 0, userCount: 0 };
		}

		return users.reduce(
			(counts, user) => {
				if (user.role === "admin") {
					counts.adminCount++;
				} else {
					counts.userCount++;
				}
				return counts;
			},
			{ adminCount: 0, userCount: 0 }
		);
	}, [users]);


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
							Admins<span className="ml-4 opacity-50">{adminCount}</span>
						</p>
						<p className="text-xl font-extrabold">
							Users<span className="ml-4 opacity-50">{userCount}</span>
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
						{filteredUsers.map((user) => (
							<UserItem
								key={user.id}
								user={user}
							/>
						))}
					</div>
				</div>
				<ConfirmUserActionModal actionType="disable" />
            	<ConfirmUserActionModal actionType="promote" />
			</div>
		);

		 
}
