import { useForm } from "react-hook-form";
import { ModalBridge } from "../modals/ModalBridge";

export const DeleteAccountModal = () => {
	const { handleSubmit } = useForm();

	const handleCloseModal = () => {
		// Logic to close the modal, e.g., reset form or update state
	};

	const onSubmit = () => {};

	return (
		<ModalBridge
			searchParam="deleteAccount"
			onClose={handleCloseModal}
			title="You Want to Delete Your Account?"
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
