
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
	useDeleteAccount,
	type DeleteAccountPayload,
} from "../../api/profileApi";
import { ModalBridge } from "../modals/ModalBridge";


export const DeleteAccountModal = () => {
	const [, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
		reset,
	} = useForm<DeleteAccountPayload>();

	const { mutate: deleteUserAccount, isPending } = useDeleteAccount();

	const handleCancel = () => {
		reset();
		setSearchParams({}, { replace: true });
	};

	const onSubmit = (data: DeleteAccountPayload) => {
		deleteUserAccount(data, {
			onSuccess: () => {
				navigate("/login"); // Redirige al login después de borrar la cuenta.
			},
			onError: (error) => {
				console.log(error)
			},
		});
	};

	const disableButton = !isDirty || isPending;

	return (
		<ModalBridge
			searchParam="deleteAccount"
			title="Delete Account"
			titleColor="text-red-500"
			width="w-1/3"
			height="h-auto"
		>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-8 text-text">
				<p className="text-center">Are you sure you want to delete your account? This action is <span className="font-bold text-red-500">irreversible</span>. Please enter your password to confirm.</p>
				<div>
					<label className="block mb-2 text-lg font-medium">Current Password</label>
					<input type="password" {...register("current_password", { required: "Password is required to delete your account" })} className="w-full px-4 py-2 bg-bg-secondary rounded-md" />
					{errors.current_password && <p className="text-red-500 text-sm mt-1">{errors.current_password.message}</p>}
				</div>
				<div className="flex justify-between items-center gap-4 mt-4">
					<input type="submit" value={isPending ? "Deleting..." : "Delete My Account"} disabled={disableButton} className="px-8 py-2 rounded-md text-2xl text-white font-bold cursor-pointer bg-bg-button-delete hover:bg-bg-button-delete-hover disabled:opacity-50 disabled:cursor-not-allowed" />
					<button type="button" onClick={handleCancel} disabled={isPending} className="px-8 py-2 rounded-md text-2xl text-white font-bold cursor-pointer bg-bg-button-primary hover:bg-bg-button-secondary disabled:opacity-50">
						Cancel
					</button>
				</div>
			</form>
		</ModalBridge>
	);
};
