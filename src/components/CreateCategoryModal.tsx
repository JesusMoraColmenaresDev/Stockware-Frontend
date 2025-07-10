import { useForm } from "react-hook-form";
import { ModalBridge } from "./ModalBridge";
import { ModalButton } from "./ModalButton";
import { SearchField } from "./SearchField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../api/categoriesApi";
import type { CategoryType } from "../types";

type CreateCategoryProps = {
	categoryName: string;
};
const defaultValues: CreateCategoryProps = {
	categoryName: "",
};

export const CreateCategoryModal = () => {
	const { register, watch, reset } = useForm<CreateCategoryProps>({
		defaultValues,
	});
	const name = watch("categoryName");

	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: createCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
		onError: () => {},
	});

	const saveFn = () => {
		const newCategory: Pick<CategoryType, "name"> = {
			name,
		};
		mutate(newCategory);
	};

	return (
		<ModalBridge
			searchParam="newCategory"
			title="Create Category"
			width="w-3/10"
			height="h-auto"
		>
			<div className="min-w-1/2 h-auto">
				<div className="flex flex-col gap-[2rem] p-[1rem]">
					<div className="flex flex-col gap-[1rem]">
						<h2 className="text-text text-xl font-semibold">Category Name</h2>
						<div className="flex justify-start gap-[0.5rem]">
							<SearchField
								name="categoryName"
								register={register}
								reset={reset}
								watch={watch}
								defaultValues={defaultValues}
								placeholder="Insert a New Category Name . . ."
							/>
						</div>
					</div>
					<div className="flex justify-between text-2xl">
						<ModalButton
							text="Save"
							openModal={true}
							classNameInyect="px-[2rem] py-[0.25rem] font-semibold"
							clickFn={saveFn}
							disabled={name.length ? false : true}
						/>
						<ModalButton
							text="Cancel"
							openModal={false}
							classNameInyect="px-[2rem] py-[0.25rem] font-semibold"
							disabled={false}
						/>
					</div>
				</div>
			</div>
		</ModalBridge>
	);
};
