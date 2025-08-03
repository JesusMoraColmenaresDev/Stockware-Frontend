import type { CategoryType } from "../../types";
import { Spinner } from "../Spinner";
import type { UseFormRegister } from "react-hook-form";
import type { HomePageViewFormValues } from "../../views/HomePageView";

type CategoryDropDownProps = {
	register: UseFormRegister<HomePageViewFormValues>;
	categories: CategoryType[];
	isLoading: boolean;
};

export const CategoryDropDown = ({
	register,
	categories,
	isLoading,
}: CategoryDropDownProps) => {
	if (isLoading)
		return (
			<Spinner size="2rem" colorPrimary="#2C3E50" colorSecondary="#3498DB" />
		);
	return (
		<select
			id="categoryFilter"
			{...register("categoryFilter")}
			className="block w-full bg-bg-secondary truncate"
		>
			<option value="0" key={"0"} className="bg-bg-secondary">
				All Categories
			</option>
			{categories &&
				categories.map((cat) => (
					<option
						value={cat.id}
						key={cat.id}
						className="bg-bg-secondary truncate overflow-hidden flex-nowrap"
						title={cat.name}
					>
						{cat.name}
					</option>
				))}
		</select>
	);
};
