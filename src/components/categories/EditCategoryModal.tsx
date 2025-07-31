import { useSearchParams } from "react-router-dom";
import { updateCategory, useGetCategoryById } from "../../api/categoriesApi";
import { SearchField } from "../SearchField";
import { useForm } from "react-hook-form";
import { ModalBridge } from "../modals/ModalBridge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type EditCategoryModalProps = {
	page: number;
	search: string;
};

type ModifyCategoryModalProps = {
	newCategoryName: string;
};
const defaultValues: ModifyCategoryModalProps = {
	newCategoryName: "",
};

export const EditCategoryModal = ({
	page = 1,
	search = "",
}: EditCategoryModalProps) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const id = Number(searchParams.get("categoryId"));

	const { category } = useGetCategoryById(id, id > 0);

	const {
		register,
		watch,
		reset,
		handleSubmit,
		formState: { isDirty },
	} = useForm<ModifyCategoryModalProps>({
		defaultValues,
	});
	const newCategoryName = watch("newCategoryName");

	useEffect(() => {
		if (category) {
			reset({ newCategoryName: category.name });
		}
	}, [category, reset]);

	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: (data: { id: number; name: string }) => {
			return updateCategory(data.id, data.name);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories", page, search] });
			handleCancel();
		},
		onError: () => {},
	});

	const handleSave = (data: ModifyCategoryModalProps) => {
		if (category) {
			mutate({
				id: category.id,
				name: data.newCategoryName,
			});
		}
	};

	const handleCancel = () => {
		searchParams.delete("editCategory");
		searchParams.delete("categoryId");
		setSearchParams(searchParams, { replace: true });
		reset();
	};

	return (
		<ModalBridge
			searchParam="editCategory"
			title="Edit Category"
			titleColor="text-text"
			width="w-3/10"
			height="h-auto"
		>
			<div className="min-w-1/2 h-auto">
				{category && (
					<form onSubmit={handleSubmit(handleSave)}>
						<div className="flex flex-col gap-[2rem] p-[1rem]">
							<div className="flex flex-col gap-[1rem]">
								<h2 className="text-text text-xl font-semibold">
									Category Name
								</h2>
								<div className="flex justify-start gap-[0.5rem]">
									<SearchField
										name="newCategoryName"
										register={register}
										reset={reset}
										watch={watch}
										defaultValues={defaultValues}
										placeholder={
											category?.name ?? "Insert a New Category Name . . ."
										}
									/>
								</div>
							</div>
							<div className="flex justify-between text-2xl">
								<button
									type="submit"
									disabled={!isDirty || isPending || !newCategoryName.length}
									className="px-[2rem] py-[0.25rem] font-semibold rounded-lg bg-bg-button-primary hover:bg-bg-button-secondary text-bg-secondary disabled:opacity-20"
									onClick={() => handleSave({ newCategoryName })}
								>
									Save
								</button>
								<button
									type="button"
									onClick={handleCancel}
									className="px-[2rem] py-[0.25rem] font-semibold rounded-lg bg-bg-button-delete hover:bg-bg-button-delete-hover text-bg-secondary"
									disabled={isPending}
								>
									Cancel
								</button>
							</div>
						</div>
					</form>
				)}
			</div>
		</ModalBridge>
	);
};
