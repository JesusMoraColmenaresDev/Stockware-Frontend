import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { disableUser } from "../../api/usersApi";
import { ModalBridge } from "../modals/ModalBridge";

type DeleteUserFormValues = {
	password: string; // Renombrado para uso futuro
};

export const DeleteUserModal = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	// Obtenemos el userId de la URL. El ModalBridge se encarga de si se muestra o no.
	const userId = searchParams.get("userId");

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<DeleteUserFormValues>({ defaultValues: { password: "" } });

	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: disableUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			handleCloseModal();
		},
		onError: (error) => {
			console.error("Error al deshabilitar el usuario:", error);
			handleCloseModal();
		},
	});

	const handleCloseModal = () => {
		searchParams.delete("deleteUser");
		searchParams.delete("userId");
		setSearchParams(searchParams, { replace: true });
		reset();
	};

	const onSubmit = (data: DeleteUserFormValues) => {
		console.log("Contraseña de confirmación (no usada aún):", data.password);
		if (userId) {
			mutate(userId);
		}
	};

	return (
		<ModalBridge
			searchParam="deleteUser"
			title="Disable User"
			titleColor="text-bg-button-delete"
			width="w-1/3"
			height="h-auto"
		>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-8">
				<p className="text-center text-text opacity-80">
					To confirm, please enter your password.
				</p>
				<input
					type="password"
					{...register("password", { required: "This field is required" })}
					className="w-full px-4 py-2 bg-bg-secondary rounded-md text-text"
					disabled={isPending}
				/>
				{errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
				<input
					type="submit"
					value={isPending ? "Disabling..." : "Confirm Disablement"}
					disabled={isPending}
					className="mt-4 px-4 py-2 rounded-md bg-bg-button-delete text-white font-bold hover:bg-deleteHover cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
				/>
			</form>
		</ModalBridge>
	);
};
