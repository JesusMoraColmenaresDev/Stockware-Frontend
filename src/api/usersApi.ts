import { useQuery } from "@tanstack/react-query";
import { usersSchema, type UserType } from "../types";
import { api } from "./axiosConfig";

const mockUsers: UserType[] = [
	{
		id: 1,
		name: "Alice Smith",
		email: "alice.smith@example.com",
		role: "Admin",
		created_at: "2024-05-21",
	},
	{
		id: 2,
		name: "Bob Johnson",
		email: "bob.johnson@example.com",
		role: "User",
		created_at: "2024-05-20",
	},
	{
		id: 3,
		name: "Charlie Brown",
		email: "charlie.brown@example.com",
		role: "User",
		created_at: "2024-05-19",
	},
];

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

export const getAllUsers = async () => {
	try {
		const { data } = await api.get("/users");
		const response = usersSchema.safeParse(data);

		if (response.success) return response.data;
		else throw new Error(response.error.message);
	} catch (error) {
		console.log(error);
		return mockUsers;
	}
};

export const useGetAllUsers = () => {
	const {
		data: users,
		isLoading: isLoadingUsers,
		isError: isErrorUsers,
	} = useQuery<UserType[]>({
		queryFn: getAllUsers,
		queryKey: ["users"],
		staleTime: Infinity,
	});

	return { users, isLoadingUsers, isErrorUsers };
};
