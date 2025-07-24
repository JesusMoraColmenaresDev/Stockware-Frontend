import { useForm } from "react-hook-form";
import { SearchField } from "../components/SearchField";
import { UserItem } from "../components/users/UserItem";
import { useGetUsers } from "../api/usersApi"; 
import { useEffect, useState } from "react";
import { ConfirmUserActionModal } from "../components/users/ConfirmActionModal";
import ReactPaginate from "react-paginate";
import { Spinner } from "../components/Spinner";

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

	const { users, isLoadingUsers, totalPages } = useGetUsers(
		currentPage,
		debouncedSearch
	);

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
		<div className="flex w-full h-full flex-col">
			<div className="bg-bg-main flex-1 px-[48px] py-2 flex flex-col min-w-0">
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
						<div className="flex flex-col pb-[1rem] pt-[1.5rem] gap-[1rem]">
							<h2 className="flex text-2xl font-bold gap-[0.75rem]">Users</h2>
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
						<div className="flex-1 overflow-y-auto">
							<div className="flex flex-col">
								{users &&
									users.map((user) => user.is_enabled && <UserItem key={user.id} user={user} />)}
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
			<ConfirmUserActionModal actionType="disable" />
			<ConfirmUserActionModal actionType="promote" />
		</div>
	);
}
