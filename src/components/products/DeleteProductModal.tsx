import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ModalBridge } from "../modals/ModalBridge";
import { ModalButton } from "../modals/ModalButton";
import { useSearchParams } from "react-router-dom";
import { deleteProduct, useGetProductById } from "../../api/productsApi";

type DeleteProductModalProps = {
	page: number;
	search: string;
	categoryIdKey: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
};

export const DeleteProductModal = ({
	page = 1,
	search = "",
	categoryIdKey = 0,
	setCurrentPage
}: DeleteProductModalProps) => {
	const [searchParams] = useSearchParams();
	const id = Number(searchParams.get("productId"));

	// Usamos el hook específico para obtener un solo producto por su ID.
	// El segundo argumento (id > 0) evita que se ejecute la consulta si el ID no es válido.
	const { product } = useGetProductById(id, id > 0);

	const queryClient = useQueryClient();
	const { mutate: deleteProductMutate } = useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["products", page, search, categoryIdKey],
			});
		},
		onError: () => {},
	});

	const deleteFn = () => {
		if (product) {
			setCurrentPage(1);
			deleteProductMutate(product.id);
			
		}
	};

	// Si el producto aún no se ha cargado o no existe, no renderizamos nada o un spinner.
	if (!product) {
		return null; // O un componente de carga
	}

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
