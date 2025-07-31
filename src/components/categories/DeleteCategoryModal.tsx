import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory, useGetCategories } from "../../api/categoriesApi";
import { ModalBridge } from "../modals/ModalBridge";
import { ModalButton } from "../modals/ModalButton";
import { useSearchParams } from "react-router-dom";

type DeleteCategoryModalProps = {
	page: number;
	search: string;
};

export const DeleteCategoryModal = ({
	page = 1,
	search = "",
}: DeleteCategoryModalProps) => {
	const [searchParams] = useSearchParams();
	const id = Number(searchParams.get("categoryId"));

	const category = useGetCategories().categories?.find((cat) => cat.id === id);

	const queryClient = useQueryClient();
	const { mutate: deleteCategoryMutate } = useMutation({
		mutationFn: deleteCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories", page, search] });
		},
		onError: () => {},
	});

	const deleteFn = () => {
		if (category) deleteCategoryMutate(category.id);
	};

	return (
		<ModalBridge
			searchParam="deleteCategory"
			title="Delete Category"
			titleColor="text-bg-button-delete"
			width="w-3/10"
			height="h-auto"
		>
			<div className="min-w-1/2 h-auto">
				<div className="flex flex-col gap-[2rem] p-[1rem]">
					<div className="flex flex-col gap-[1rem]">
						<hr className="border-1" />
						<h2 className="text-text text-xl font-medium text-center">
							Are you sure yo want to delete the
							<span className="font-bold">"{category?.name}"</span>
							category?
						</h2>
					</div>
					<div className="flex flex-col text-2xl gap-[1rem] items-center">
						<ModalButton
							text="Delete"
							openModal={false}
							classNameInyect="px-[2rem] py-[0.25rem] font-semibold"
							clickFn={deleteFn}
							disabled={false}
						/>
						<ModalButton
							text="Cancel"
							openModal={true}
							classNameInyect="px-[2rem] py-[0.25rem] font-semibold"
							disabled={false}
						/>
					</div>
				</div>
			</div>
		</ModalBridge>
	);
};
