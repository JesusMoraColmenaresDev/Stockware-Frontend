import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import {
	useChangePassword,
	type ChangePasswordPayload,
} from "../../api/profileApi";
import { ModalBridge } from "../modals/ModalBridge";

export const ChangePasswordModal = () => {
	const [, setSearchParams] = useSearchParams();

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
		watch,
		reset,
	} = useForm<ChangePasswordPayload>();

	const { mutate: updatePassword, isPending } = useChangePassword();

	const handleCancel = () => {
		reset();
		setSearchParams({}, { replace: true });
	};

	const onSubmit = (data: ChangePasswordPayload) => {
		updatePassword(data, {
			onSuccess: () => {
				console.log("Password changed successfully")
				handleCancel();
			},
			onError: (error) => {
				console.log(error)
			},
		});
	};

	const newPassword = watch("password");
	const disableButton = !isDirty || isPending;

	return (
		<ModalBridge
			searchParam="changePassword"
			title="Change your Password"
			titleColor="text-text"
			width="w-1/4"
			height="h-auto"
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4 mt-8 text-text"
			>
				<div>
					<label className="block mb-2 text-lg font-medium">Current Password</label>
					<input type="password" {...register("current_password", { required: "Current password is required" })} className="w-full px-4 py-2 bg-bg-secondary rounded-md" />
					{errors.current_password && <p className="text-red-500 text-sm mt-1">{errors.current_password.message}</p>}
				</div>
				<div>
					<label className="block mb-2 text-lg font-medium">New Password</label>
					<input type="password" {...register("password", { required: "New password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} className="w-full px-4 py-2 bg-bg-secondary rounded-md" />
					{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
				</div>
				<div>
					<label className="block mb-2 text-lg font-medium">Confirm New Password</label>
					<input type="password" {...register("password_confirmation", { required: "Please confirm your new password", validate: value => value === newPassword || "The passwords do not match" })} className="w-full px-4 py-2 bg-bg-secondary rounded-md" />
					{errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation.message}</p>}
				</div>

				<div className="flex justify-between items-center gap-4 mt-4">
					<input
						type="submit"
						value={isPending ? "Saving..." : "Save"}
						disabled={disableButton}
						className="px-8 py-2 rounded-md text-2xl text-white font-bold cursor-pointer bg-bg-button-primary hover:bg-bg-button-secondary disabled:opacity-50 disabled:cursor-not-allowed"
					/>
					<button type="button" onClick={handleCancel} disabled={isPending} className="px-8 py-2 rounded-md text-2xl text-white font-bold cursor-pointer bg-bg-button-delete hover:bg-bg-button-delete-hover disabled:opacity-50">
						Cancel
					</button>
				</div>
			</form>
		</ModalBridge>
	);
};
