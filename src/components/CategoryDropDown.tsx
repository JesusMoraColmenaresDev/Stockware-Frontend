import { useQuery } from "@tanstack/react-query";
import type { CategoryType } from "../types";
import { getCategories } from "../api/categoriesApi";
import { Spinner } from "./Spinner";

export const CategoryDropDown = () => {
	const { data: categories, isLoading } = useQuery<CategoryType[]>({
		queryKey: ["categories"],
		queryFn: getCategories,
		staleTime: Infinity,
	});

	if (isLoading)
		return (
			<Spinner size="2rem" colorPrimary="#2C3E50" colorSecondary="#3498DB" />
		);
	return (
		<select name="category" id="category">
			<option value="0">Category</option>
			{categories &&
				categories.map((cat) => <option value={cat.id}>{cat.name}</option>)}
		</select>
	);
};
