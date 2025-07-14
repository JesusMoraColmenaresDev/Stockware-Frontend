import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { disableUser, promoteUser } from "../../api/usersApi";
import { ModalContainer } from "../modals/ModalContainer";


type ConfirmActionFormValues = {
	password_confirmation: string;
};

// Definimos los tipos de acciones que el modal puede manejar
export type ActionType = "disable" | "promote";

// Props para el modal genérico
type ConfirmUserActionModalProps = {
	actionType: ActionType;
};

// Objeto de configuración para cada tipo de acción.
// Esto hace que el modal sea fácilmente extensible para futuras acciones.
const actionConfig = {
	disable: {
		title: "Disable User",
		titleColor: "text-bg-button-delete",
		buttonText: "Confirm Disablement",
		buttonLoadingText: "Disabling...",
		buttonClass: "bg-bg-button-delete hover:bg-deleteHover",
		mutationFn: disableUser,
		successMessage: "User disabled successfully.",
		errorMessage: "Error disabling user.",
	},
	promote: {
		title: "Promote User",
		titleColor: "text-sucess",
		buttonText: "Confirm Promotion",
		buttonLoadingText: "Promoting...",
		buttonClass: "bg-bg-button-primary hover:bg-sucess",
		// TODO: Crear la función 'promoteUser' en usersApi.ts que reciba el userId
		mutationFn:  promoteUser ,//promoteUser,
		successMessage: "User promoted to admin successfully.",
		errorMessage: "Error promoting user.",
	},
};

export const ConfirmUserActionModal = ({
	actionType,
}: ConfirmUserActionModalProps) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const config = actionConfig[actionType];

	// El modal solo se abre si el 'action' en la URL coincide con el 'actionType' de esta instancia del modal
	const currentAction = searchParams.get("action");
	const userId = searchParams.get("userId");
	const isOpen = currentAction === actionType && !!userId;

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ConfirmActionFormValues>({
		defaultValues: { password_confirmation: "" },
	});

	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: config.mutationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			handleCloseModal();
		},
		onError: (error) => {
			console.error(error);
			handleCloseModal();
		},
	});

	const handleCloseModal = () => {
		searchParams.delete("action");
		searchParams.delete("userId");
		setSearchParams(searchParams, { replace: true });
		reset();
	};

	const onSubmit = (data: ConfirmActionFormValues) => {
		// Aquí se podría usar data.password_confirmation si el backend lo requiere
		console.log("Password for confirmation:", data.password_confirmation);
		if (userId) {
			mutate(userId);
		}
	};

	return (
		<ModalContainer
			isOpen={isOpen}
			closeFn={handleCloseModal}
			title={config.title}
			titleColor={config.titleColor}
			width="w-1/3"
			height="h-auto"
		>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-8">
				<p className="text-center text-text opacity-80">
					To confirm, please enter your password.
				</p>
				<input
					type="password"
					{...register("password_confirmation", { required: "This field is required" })}
					className="w-full px-4 py-2 bg-bg-secondary rounded-md text-text"
					disabled={isPending}
					autoComplete="current-password"
				/>
				{errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>}
				<input
					type="submit"
					value={isPending ? config.buttonLoadingText : config.buttonText}
					disabled={isPending}
					className={`mt-4 px-4 py-2 rounded-md text-white font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${config.buttonClass}`}
				/>
			</form>
		</ModalContainer>
	);
};


