import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import { Controller, type Control, type FieldValues } from "react-hook-form";
import type { CategoryType } from "../../types";
import { Spinner } from "../Spinner";
import { LuChevronDown } from "react-icons/lu";

export interface CategoryDropDownProps<TFormValues extends FieldValues> {
	control: Control<TFormValues>;
	fieldName: keyof TFormValues;
	categories: CategoryType[];
	isLoading: boolean;
}

export const CategoryDropDown = <TFormValues extends FieldValues>({
	control,
	fieldName,
	categories,
	isLoading,
}: CategoryDropDownProps<TFormValues>) => {
	// If still loading, show spinner
	if (isLoading) {
		return (
			<Spinner size="2rem" colorPrimary="#2C3E50" colorSecondary="#3498DB" />
		);
	}

	return (
		<Controller
			control={control}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			name={fieldName as any}
			render={({ field: { value, onChange } }) => (
				<div className="relative w-full">
					<Listbox value={value} onChange={onChange}>
						<ListboxButton className="w-full max-md:text-sm bg-bg-secondary truncate p-2 rounded flex flex-row items-center">
							{categories.find((cat) => cat.id === Number(value))?.name ||
								"All Categories"}
							{""}
							<LuChevronDown />
						</ListboxButton>
						<ListboxOptions className="absolute mt-1 w-full bg-bg-secondary max-h-60 overflow-auto rounded shadow-lg z-10">
							<ListboxOption
								key={0}
								value={0}
								className="p-2 truncate hover:bg-bg-hover flex flex-row items-center"
								title="All Categories"
							>
								All Categories
								<LuChevronDown />
							</ListboxOption>
							{categories.map((cat) => (
								<ListboxOption
									key={cat.id}
									value={cat.id}
									className="p-2 truncate hover:bg-bg-hover"
									title={cat.name}
								>
									{cat.name}
								</ListboxOption>
							))}
						</ListboxOptions>
					</Listbox>
				</div>
			)}
		/>
	);
};
