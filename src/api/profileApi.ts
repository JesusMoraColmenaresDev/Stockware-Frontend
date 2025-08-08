import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "./axiosConfig";

// Definimos el esquema de datos del perfil con Zod para validación.
export const profileSchema = z.object({
	id: z.number(),
	name: z.string(),
	email: z.string().email(),
	role: z.string(),
});

//  Creamos un tipo de TypeScript a partir del esquema.
export type ProfileType = z.infer<typeof profileSchema>;

export const getProfileInfo = async () => {
	try {
		const { data } = await api.get("/profile");
		//  Validamos que la respuesta de la API coincida con nuestro esquema.
		const result = profileSchema.safeParse(data);
		if (result.success) {
			return result.data;
		} else {
			throw new Error("Error al validar los datos del perfil");
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};

//  Creamos el custom hook para consumir los datos en nuestros componentes.
export const useGetProfileInfo = () => {
	return useQuery<ProfileType>({
		queryKey: ["profile"],
		queryFn: getProfileInfo,
		staleTime: 1000 * 60 * 60, // 1 hora de cache, ya que el perfil no cambia a menudo.
		retry: false, // No reintentar si falla
	});
};

// Definimos el tipo de datos que se enviarán para actualizar.
export type UpdateProfilePayload = {
	name?: string;
	email?: string;
	current_password?: string;
};

//  Creamos la función que hace la llamada a la API para actualizar.
export const updateProfileInfo = async (data: UpdateProfilePayload) => {
	try {
		// El backend espera los datos dentro de un objeto 'user'
		const { data: responseData } = await api.patch("/profile", { user: data });
		return responseData;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

//  Creamos el custom hook de mutación.
export const useUpdateProfile = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateProfileInfo,
		onSuccess: () => {
			// Invalida la caché del perfil para que la UI se actualice automáticamente.
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
	});
};

//  Definimos el tipo de datos para cambiar la contraseña.
export type ChangePasswordPayload = {
	current_password?: string;
	password?: string;
	password_confirmation?: string;
};

//  Creamos la función que hace la llamada a la API para cambiar la contraseña.
export const changePassword = async (data: ChangePasswordPayload) => {
	try {
		// El backend espera los datos dentro de un objeto 'user'
		const { data: responseData } = await api.patch("/password", { user: data });
		return responseData;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

//  Creamos el custom hook de mutación para el cambio de contraseña.
export const useChangePassword = () => {
	return useMutation({
		mutationFn: changePassword,
		// No es necesario invalidar queries aquí, ya que la contraseña no se muestra en la UI.
	});
};

export type DisableAccountPayload = {
	current_password: string;
};

// Creamos la función que hace la llamada a la API para deshabilitar la cuenta del propio usuario.
export const disableOwnAccount = async (data: DisableAccountPayload) => {
	// eslint-disable-next-line no-useless-catch
	try {
		// El backend espera los datos dentro de un objeto 'user'
		const { data: responseData } = await api.patch("/profile/disable", {
			user: data,
		});
		return responseData;
	} catch (error) {
		throw error; // Dejamos que React Query maneje el objeto de error.
	}
};

export type DeleteAccountPayload = {
	current_password?: string;
};

// Creamos la función que hace la llamada a la API para eliminar la cuenta.
export const deleteAccount = async (data: DeleteAccountPayload) => {
	try {
		// Para peticiones DELETE con body en Axios, se pasa en el objeto de configuración.
		await api.delete("/profile", { data: { user: data } });
	} catch (error) {
		console.error(error);
		throw error;
	}
};

//Creamos el custom hook de mutación para eliminar la cuenta.
export const useDeleteAccount = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteAccount,
		onSuccess: () => {
			// Limpiamos toda la caché de React Query ya que el usuario ya no existe.
			queryClient.clear();
			// Eliminamos el token de autenticación del almacenamiento local.
			localStorage.removeItem("jwt");
		},
	});
};
