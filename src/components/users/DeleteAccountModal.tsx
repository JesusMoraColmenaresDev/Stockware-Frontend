import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import {type ProfileType, disableOwnAccount, type DisableAccountPayload } from "../../api/profileApi";
import { ModalBridge } from "../modals/ModalBridge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { disableUser } from "../../api/usersApi";

// The form still requires a password for confirmation, even if not sent to the API.
type DisableAccountFormValues = {
	current_password: string;
};


export const DeleteAccountModal = () => {
	const [, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
		reset,
	} = useForm<DisableAccountFormValues>();

	const { mutate: disableAccount, isPending } = useMutation({
		mutationFn: disableOwnAccount,
		onSuccess: () => {
			// Clear cache, remove token, and redirect to login
			queryClient.clear();
			localStorage.removeItem("jwt");
			navigate("/login");
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const handleCancel = () => {
		reset();
		setSearchParams({}, { replace: true });
	};

	const onSubmit = (data : DisableAccountPayload) => {
		disableAccount(data);
	};

	const disableButton = !isDirty || isPending;

	return (
		<ModalBridge
			searchParam="deleteAccount"
			title="Disable Account"
			titleColor="text-red-500"
			width="w-1/3"
			height="h-auto"
		>	
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-8 text-text">
				<p className="text-center">
					Are you sure you want to disable your account? This action can be
					undone by an administrator. Please enter your password to confirm.
				</p>
				<div>
					<label className="block mb-2 text-lg font-medium">Current Password</label>
					<input type="password" {...register("current_password", { required: "Password is required to disable your account" })} className="w-full px-4 py-2 bg-bg-secondary rounded-md" />
					{errors.current_password && <p className="text-red-500 text-sm mt-1">{errors.current_password.message}</p>}
				</div>
				<div className="flex justify-between items-center gap-4 mt-4">
					<input type="submit" value={isPending ? "Disabling..." : "Disable My Account"} disabled={disableButton} className="px-8 py-2 rounded-md text-2xl text-white font-bold cursor-pointer bg-bg-button-delete hover:bg-bg-button-delete-hover disabled:opacity-50 disabled:cursor-not-allowed" />
					<button type="button" onClick={handleCancel} disabled={isPending} className="px-8 py-2 rounded-md text-2xl text-white font-bold cursor-pointer bg-bg-button-primary hover:bg-bg-button-secondary disabled:opacity-50">
						Cancel
					</button>
				</div>
			</form>
		</ModalBridge>
	);
};
