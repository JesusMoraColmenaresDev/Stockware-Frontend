import { useForm } from "react-hook-form";
import { ModalBridge } from "../modals/ModalBridge";
import { ModalButton } from "../modals/ModalButton";
import { SearchField } from "../SearchField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../api/categoriesApi";
import type { CategoryType } from "../../types";

type CreateCategoryModalProps = {
	page: number;
	search: string;
};

type CreateCategoryFormProps = {
	categoryName: string;
};
const defaultValues: CreateCategoryFormProps = {
	categoryName: "",
};

export const CreateCategoryModal = ({
	page = 1,
	search = "",
}: CreateCategoryModalProps) => {
	const { register, watch, reset } = useForm<CreateCategoryFormProps>({
		defaultValues,
	});
	const name = watch("categoryName");

	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: createCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories", page, search] });
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
			titleColor="text-text"
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
							clickFn={() => {
								reset();
							}}
						/>
					</div>
				</div>
			</div>
		</ModalBridge>
	);
};
