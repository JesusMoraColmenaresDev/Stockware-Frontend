import { useForm } from "react-hook-form";
import { SearchField } from "../components/SearchField";
import { UserItem } from "../components/users/UserItem";
import { useGetUsers, useGetUsersCount } from "../api/usersApi";
import { useEffect, useState } from "react";
import { ConfirmUserActionModal } from "../components/users/ConfirmActionModal";
import { Spinner } from "../components/Spinner";
import PaginateComponent from "../components/PaginateComponent";

type UsersViewFormValues = {
	searchUser: string;
};

const defaultValues: UsersViewFormValues = {
	searchUser: "",
};

export default function UsersView() {
	const [currentPage, setCurrentPage] = useState(1);
	const [debouncedSearch, setDebouncedSearch] = useState("");

	const {
		register,
		watch,
		reset: resetSearch,
	} = useForm<UsersViewFormValues>({
		defaultValues,
	});

	const searchUser = watch("searchUser");

	const {
		users: usersPaginated,
		isLoadingUsers,
		totalPages,
	} = useGetUsers(currentPage, debouncedSearch);

	const { usersCount, isLoadingUsersCount } = useGetUsersCount();

	const handlePageClick = (event: { selected: number }) => {
		setCurrentPage(event.selected + 1);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchUser);
		}, 300); // Espera 300ms después de que el usuario deja de escribir

		return () => clearTimeout(timer); // Limpia el temporizador si el usuario sigue escribiendo
	}, [searchUser]);

	// Efecto para reiniciar la paginación cuando cambian los filtros
	useEffect(() => {
		setCurrentPage(1);
	}, [debouncedSearch]);

	return (
		<div className="flex h-full w-full flex-col">
			<div className="bg-bg-main flex-1 px-4 md:px-6 py-2 flex flex-col min-w-0 max-md:mt-18">
				{isLoadingUsers ? (
					<div className="flex items-center justify-center h-full">
						<Spinner
							size="20rem"
							colorPrimary="#2C3E50"
							colorSecondary="#3498DB"
						/>
					</div>
				) : (
					<>
						<div className=" flex flex-col pb-[1rem] pt-[1.5rem] gap-[1rem] max-md:items-center">
							<h2 className="flex text-2xl font-bold gap-[0.75rem]">
								Total Users{" "}
								<span className="opacity-55">
									{isLoadingUsersCount ? "..." : usersCount?.total_count ?? 0}
								</span>
							</h2>
							<div className="flex w-1/2 max-md:w-full gap-[48px] max-md:justify-between ">
								<p className="text-xl font-extrabold text-bg-button-primary">
									Admins
									<span className="ml-4 opacity-50">
										{isLoadingUsersCount ? "..." : usersCount?.admin_count ?? 0}
									</span>
								</p>
								<p className="text-xl font-extrabold">
									Users
									<span className="ml-4 opacity-50">
										{isLoadingUsersCount ? "..." : usersCount?.user_count ?? 0}
									</span>
								</p>
							</div>
							<div className="flex w-1/2 gap-[1rem] max-md:w-full">
								<div className="flex w-3/5 max-md:w-full">
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
						<div className="flex-1 overflow-y-auto">
							<div className="flex flex-col">
								{usersPaginated &&
									usersPaginated.map(
										(user) =>
											user.is_enabled && <UserItem key={user.id} user={user} />
									)}
							</div>
						</div>
						<PaginateComponent
							totalPages={totalPages}
							currentPage={currentPage}
							handlePageClick={handlePageClick}
						></PaginateComponent>
					</>
				)}
			</div>
			<ConfirmUserActionModal actionType="disable" />
			<ConfirmUserActionModal actionType="promote" />
		</div>
	);
}
