import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ModalBridge } from "../modals/ModalBridge";
import { ModalButton } from "../modals/ModalButton";
import { useSearchParams } from "react-router-dom";
import { deleteProduct, useGetProducts } from "../../api/productsApi";

export const DeleteProductModal = () => {
	const [searchParams] = useSearchParams();
	const id = Number(searchParams.get("productId"));

	const product = useGetProducts().products?.find((prod) => prod.id === id);

	const queryClient = useQueryClient();
	const { mutate: deleteProductMutate } = useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onError: () => {},
	});

	const deleteFn = () => {
		if (product) deleteProductMutate(product.id);
	};

	return (
		<ModalBridge
			searchParam="deleteProduct"
			title="Delete Product"
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
							<span className="font-bold">"{product?.name}"</span>
							product?
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
