import { useForm } from "react-hook-form";
import { ModalBridge } from "../modals/ModalBridge";
import { ModalButton } from "../modals/ModalButton";

// Placeholder for form values
type EditProfileFormValues = {
    name: string;
    email: string;
};

export const EditProfileModal = () => {
    const { register, handleSubmit, reset } = useForm<EditProfileFormValues>();

    const handleCloseModal = () => {
        reset();
    };

    const onSubmit = (data: EditProfileFormValues) => {
        console.log("Updating profile...", data);
        // Here you would call the API to update the user
        handleCloseModal();
    };

    return (
        <ModalBridge
            searchParam="editProfile"
            onClose={handleCloseModal}
            title="Edit Information"
            titleColor="text-text"
            width="w-1/4"
            height="h-auto"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-8 text-text">
                <div>
                    <label htmlFor="name" className="block mb-2 text-lg font-medium">Name</label>
                    <input type="text" id="name" {...register("name")} className="w-full px-4 py-2 bg-bg-secondary rounded-md" />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-lg font-medium">Email</label>
                    <input type="email" id="email" {...register("email")} className="w-full px-4 py-2 bg-bg-secondary rounded-md" />
                </div>
                <div className="flex justify-between items-center gap-4 mt-4">
                    <input type="submit" value="Save" className="px-8 py-2 rounded-md text-2xl text-white font-bold cursor-pointer bg-bg-button-primary hover:bg-bg-button-secondary" />

                    <ModalButton
                        text="Cancel"
                        openModal={false}
                        classNameInyect="px-8 py-2 font-bold text-2xl"
                        clickFn={reset}
                        disabled={false}
                    />
                </div>
            </form>
        </ModalBridge>
    );
};

