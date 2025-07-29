import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import {
	useUpdateProfile,
	type ProfileType,
	type UpdateProfilePayload,
} from "../../api/profileApi";
import { ModalBridge } from "../modals/ModalBridge";


// Placeholder for form values
type EditProfileFormValues = {
	name: string;
	email: string;
	current_password?: string;
};

type EditProfileModalProps = {
	profile: ProfileType;
};

export const EditProfileModal = ({ profile }: EditProfileModalProps) => {
	const [, setSearchParams] = useSearchParams();
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { isDirty, dirtyFields, errors },
	} = useForm<EditProfileFormValues>({ mode: "onChange" });

	const { mutate: updateProfile, isPending } = useUpdateProfile();

	useEffect(() => {
		if (profile) {
			reset({
				name: profile.name,
				email: profile.email,
				current_password: "",
			});
		}
	}, [profile, reset]);

	const handleCancel = () => {
		setSearchParams({}, { replace: true });
		// Resetea el formulario a los datos originales del perfil al cancelar
		if (profile) {
			reset({ name: profile.name, email: profile.email, current_password: "" });
		}
	};

	const onSubmit = (data: EditProfileFormValues) => {
		// 1. Creamos un objeto vacío para el payload.
		const payload: UpdateProfilePayload = {};

		// 2. Llenamos el payload solo con los campos que han cambiado.
		if (dirtyFields.name) {
			payload.name = data.name;
		}
		if (dirtyFields.email) {
			payload.email = data.email;
			// Si el email cambió, incluimos la contraseña actual.
			payload.current_password = data.current_password;
		}

		// 3. Solo hacemos la llamada a la API si realmente hay cambios.
		if (Object.keys(payload).length > 0) {
			updateProfile(payload, {
				onSuccess: handleCancel, // Cierra el modal en caso de éxito
			});
		} else {
			handleCancel(); // Si no hay cambios, solo cierra el modal.
		}
	};

	const emailIsDirty = !!dirtyFields.email;

	// El botón de guardar se habilita solo si el usuario ha hecho cambios.
	const disableButton =
		!isDirty || isPending || (emailIsDirty && !watch("current_password"));

	return (
		<ModalBridge
			searchParam="editProfile"
			title="Edit Information"
			titleColor="text-text"
			width="w-1/4"
			height="h-auto"
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4 mt-8 text-text"
			>
				<div>
					<label htmlFor="name" className="block mb-2 text-lg font-medium">
						Name
					</label>
					<input
						type="text"
						id="name"
						{...register("name")}
						className="w-full px-4 py-2 bg-bg-secondary rounded-md"
					/>
				</div>
				<div>
					<label htmlFor="email" className="block mb-2 text-lg font-medium">
						Email
					</label>
					<input
						type="email"
						id="email"
						{...register("email")}
						className="w-full px-4 py-2 bg-bg-secondary rounded-md"
					/>
				</div>
				<div>
					<label
						htmlFor="current_password"
						className={`block mb-2 text-lg font-medium transition-opacity duration-300 ${
							emailIsDirty ? "opacity-100" : "opacity-50"
						}`}
					>
						Current Password
					</label>
					<input
						type="password"
						id="current_password"
						{...register("current_password", {
							required: emailIsDirty ? "Password is required to change email" : false,
						})}
						disabled={!emailIsDirty}
						className="w-full px-4 py-2 bg-bg-secondary rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
						placeholder={emailIsDirty ? "Enter your password" : "Required to change email"}
					/>
					{errors.current_password && <p className="text-red-500 text-sm mt-1">{errors.current_password.message}</p>}
				</div>
				<div className="flex justify-between items-center gap-4 mt-4">
					<input
						type="submit"
						value={isPending ? "Saving..." : "Save"}
						disabled={disableButton}
						className="px-8 py-2 rounded-md text-2xl text-white font-bold cursor-pointer bg-bg-button-primary hover:bg-bg-button-secondary disabled:opacity-50 disabled:cursor-not-allowed"
					/>

					<button
						type="button"
						onClick={handleCancel}
						disabled={isPending}
						className="px-8 py-2 rounded-md text-2xl text-white font-bold cursor-pointer bg-bg-button-delete hover:bg-bg-button-delete-hover disabled:opacity-50"
					>
						Cancel
					</button>
				</div>
			</form>
		</ModalBridge>
	);
};
