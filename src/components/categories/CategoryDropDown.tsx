import { useQuery } from "@tanstack/react-query";
import type { CategoryType } from "../../types";
import { Spinner } from "../Spinner";
import type { UseFormRegister } from "react-hook-form";
import { getCategories } from "../../api/categoriesApi";
import type { HomePageViewFormValues } from "../../views/HomePageView";

type CategoryDropDownProps = {
	register: UseFormRegister<HomePageViewFormValues>;
};

export const CategoryDropDown = ({ register }: CategoryDropDownProps) => {
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
		<select id="categoryFilter" {...register("categoryFilter")}>
			<option value="0" key={"0"} className="bg-bg-secondary">
				All Categories
			</option>
			{categories &&
				categories.map((cat) => (
					<option value={cat.id} key={cat.id} className="bg-bg-secondary">
						{cat.name}
					</option>
				))}
		</select>
	);
};
