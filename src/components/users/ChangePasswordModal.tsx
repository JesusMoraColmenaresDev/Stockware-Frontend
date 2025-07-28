import { useForm } from "react-hook-form";
import { ModalBridge } from "../modals/ModalBridge";

export const ChangePasswordModal = () => {
	const { handleSubmit, reset } = useForm();

	const handleCloseModal = () => {
		// Logic to close the modal, e.g., reset form or update state
	};

	const onSubmit = (data: unknown) => {
		// Handle password change logic here
		console.log("Password changed:", data);
		reset(); // Reset the form after submission
		handleCloseModal(); // Close the modal after submission
	};

	return (
		<ModalBridge
			searchParam="changePassword"
			onClose={handleCloseModal}
			title="Change Password"
			titleColor="text-text"
			width="w-1/4"
			height="h-auto"
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4 mt-8 text-text"
			></form>
		</ModalBridge>
	);
};
