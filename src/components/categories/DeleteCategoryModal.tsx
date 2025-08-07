import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	deleteCategory,
	useGetCategoryById,
} from "../../api/categoriesApi";
import { ModalBridge } from "../modals/ModalBridge";
import { ModalButton } from "../modals/ModalButton";
import { useSearchParams } from "react-router-dom";

type DeleteCategoryModalProps = {
	page: number;
	search: string;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const DeleteCategoryModal = ({
	page = 1,
	search = "",
	setCurrentPage,
}: DeleteCategoryModalProps) => {
	const [searchParams] = useSearchParams();
	const id = Number(searchParams.get("categoryId"));

	const { category } = useGetCategoryById(id, id > 0);

	const queryClient = useQueryClient();
	const { mutate: deleteCategoryMutate, isPending } = useMutation({
		mutationFn: deleteCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories", page, search] });
		},
		onError: () => {},
	});

	const deleteFn = () => {
		if (category) {
			setCurrentPage(1);
			deleteCategoryMutate(category.id);
		}
	};

	// Si la categoría aún no se ha cargado o no existe, no renderizamos nada.
	if (!category) {
		return null;
	}

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
							disabled={isPending}
						/>
					</div>
				</div>
			</div>
		</ModalBridge>
	);
};
