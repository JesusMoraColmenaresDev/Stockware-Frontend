import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { usersSchema, type UserType } from "../types";
import { api } from "./axiosConfig";
import { isAxiosError } from "axios";

/* const mockUsers: UserType[] = [
	{
		id: 1,
		name: "Alice Smith",
		email: "alice.smith@example.com",
		role: "admin",
		is_enabled: true,
		created_at: "2024-05-21",
	},
	{
		id: 2,
		name: "Bob Johnson",
		email: "bob.johnson@example.com",
		role: "user",
		is_enabled: true,
		created_at: "2024-05-20",
	},
	{
		id: 3,
		name: "Charlie Brown",
		email: "charlie.brown@example.com",
		role: "user",
		is_enabled: true,
		created_at: "2024-05-19",
	},
	{
		id: 4,
		name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni numquam vel minima facilis soluta omnis eligendi, maxime blanditiis, inventore molestias architecto aperiam corporis, sit quisquam perferendis saepe dolorem tempore ipsum.",
		email: "charlie.brown@example.com",
		role: "user",
		is_enabled: true,
		created_at: "2024-05-19",
	},
]; */

export type PaginatedUserResponse = {
	users: UserType[];
	totalPages: number;
};

export const parseCreatedAtDate = (created_at: string) => {
	const date = new Date(created_at);
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, "0"); // +1 porque empieza en 0, y si es 1 solo digito, lo formateamos de tipo 01
	const day = date.getDate().toString().padStart(2, "0");

	const formattedDate = `${year}-${month}-${day}`;

	// Otra forma seria:
	// const isoDate = date.toISOString().substring(0, 10); // Cortar justo, pero lo malo es que ya tiene su propio formato de todas formas

	return formattedDate;
};

export const getUsers = async (page: number = 1, search: string = "") => {
	try {
		const params = new URLSearchParams();
		params.append("page", page.toString());

		if (search) {
			params.append("search", search.toString());
		}

		const { data } = await api.get(`/users?${params.toString()}`);
		const totalPages = data.metadata.pages;
		const response = usersSchema.safeParse(data.data);

		if (response.success) return { users: response.data, totalPages };
		else throw new Error(response.error.message);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const useGetUsers = (page: number = 1, search: string = "") => {
	const {
		data,
		isLoading: isLoadingUsers,
		isError: isErrorUsers,
	} = useQuery<PaginatedUserResponse>({
		queryFn: () => getUsers(page, search),
		queryKey: ["users", { page, search }],
		staleTime: Infinity,
		placeholderData: keepPreviousData,
	});

	return {
		users: data?.users,
		totalPages: data?.totalPages,
		isLoadingUsers,
		isErrorUsers,
	};
};

export const getAllUsers = async () => {
	try {
		const { data } = await api.get("/users/all");
		const response = usersSchema.safeParse(data);
		if (response.success) return response.data;
		else throw new Error(response.error.message);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const useGetAllUsers = () => {
	const {
		data: users,
		isLoading: isLoadingUsers,
		isError: isUsersError,
	} = useQuery<UserType[]>({
		queryKey: ["users", "all"],
		queryFn: getAllUsers,
		staleTime: Infinity,
	});

	return { users, isLoadingUsers, isUsersError };
};

export const disableUser = async (userId: string) => {
	// Usamos PATCH porque solo estamos actualizando un campo
	const { data } = await api.patch(`/users/${userId}`, {
		is_enabled: false,
	});
	return data;
};

export const promoteUser = async (userId: string) => {
	// Usamos PATCH porque solo estamos actualizando un campo
	const { data } = await api.patch(`/users/${userId}`, {
		role: "admin",
	});
	return data;
};

export const createDBBackUp = async () => {
	try {
		const token = localStorage.getItem("jwt");
		if (!token) throw new Error("No JWT token found in localStorage");
		const response = await api.post(
			"/backup",
			{},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		// console.log(response);
		if (response.status === 202) {
			return response.data.message; // Assuming the response contains the backup data or confirmation
		} else {
			throw new Error(
				`Unexpected status code: ${response.status} with message: ${response.data}`
			);
		}
	} catch (error) {
		if (isAxiosError(error)) {
			console.error("Error creating backup:", error.response?.data);
		} else {
			console.error("Unexpected error:", error);
		}
	}
};
