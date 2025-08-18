/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { isAxiosError } from "axios";

export const api = axios.create({
	baseURL: "http://localhost:3000",
});

// Interceptor para añadir token a cada petición
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("jwt");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Token inválido o expirado
			localStorage.removeItem("jwt");
			delete api.defaults.headers.common["Authorization"];

			console.error("Sesión expirada. Por favor inicia sesión nuevamente.");
		}
		return Promise.reject(error);
	}
);

/* export const handleApiError = (error: unknown, when?: string) => {
	if (isAxiosError(error)) {
		// Case 1: The server responded with an error status code (4xx, 5xx)
		if (error.response) {
			/// This will be your Rails validation error (status 422)
			// or a server error (status 500)
			return new Error(error.response.data.message || "An error occurred");
		} else if (error.request) {
			// Case 2: The request was made, but no response was received (NETWORK ERROR)
			// This is the "server not reached" error you're worried about.
			return new Error("Network error: The server could not be reached.");
		} else {
			// Something happened in setting up the request that triggered an Error
			console.error("Error message:", error.message);
			return new Error(error.message || "An error occurred");
		}
	}
	// Case 3: A Zod error (or other standard JS error) occurred
	if (error instanceof Error) {
		return new Error(error.message);
	}
	// Fallback for any other unexpected error
	return new Error(`An unexpected error occurred. ${when ? when : ""}`);
};
 */
/**
 * Returns an Error instance with optional .status, .errors (string[]), .raw
 * Usage: throw handleApiError(e, "when doing X")
 */
export const handleApiError = (error: unknown, when?: string): Error => {
	const suffix = when ? ` (${when})` : "";

	// Axios errors
	if (isAxiosError(error)) {
		// 1) server responded with a status (4xx or 5xx)
		if (error.response) {
			const status = error.response.status;
			const data = error.response.data;
			const errors: string[] = [];
			let message: string | undefined;

			// If server returns a simple string body
			if (typeof data === "string" && data.trim().length) {
				message = data;
			} else if (data && typeof data === "object") {
				// Prefer explicit fields you use in controllers:
				// - { message: "..." }
				// - { error: "..." }
				// - { errors: [...] } (array)
				// - { errors: { field: ["msg"] } } (model.errors)
				// - render json: @model.errors  -> object of arrays (same as above)
				if (typeof (data as any).message === "string") {
					message = (data as any).message;
				} else if (typeof (data as any).error === "string") {
					message = (data as any).error;
				}

				// errors array: { errors: [ "a", "b" ] }
				if (Array.isArray((data as any).errors)) {
					(data as any).errors.forEach((e: any) => errors.push(String(e)));
				} else {
					// If data is an object, maybe it's model.errors like:
					// { name: ["can't be blank"], other: ["..."] }
					// Or { errors: { name: ["..."] } } (some patterns)
					const maybeErrorsObj = (data as any).errors ?? data;
					if (maybeErrorsObj && typeof maybeErrorsObj === "object") {
						Object.values(maybeErrorsObj).forEach((val: any) => {
							if (Array.isArray(val))
								val.forEach((v) => errors.push(String(v)));
							else if (typeof val === "string") errors.push(val);
						});
					}
				}
			}

			// If nothing explicit found, try axios message or status
			if (!message) {
				if (errors.length) message = errors.join(", ");
				else if (error.message && error.message !== "Network Error")
					message = error.message;
				else message = `Request failed with status ${status}`;
			}

			const e = new Error(`${message}${suffix}`);
			(e as any).status = status;
			(e as any).errors = errors.length ? errors : undefined;
			(e as any).raw = data;
			return e;
		}

		// 2) request made but no response (network down / server unreachable)
		if (error.request) {
			const e = new Error(`Network error: Server not reachable.${suffix}`);
			(e as any).status = undefined;
			(e as any).errors = undefined;
			(e as any).raw = undefined;
			return e;
		}

		// 3) something happened setting up the request
		return new Error(`${error.message ?? "Request setup error"}${suffix}`);
	}

	// Zod or plain Error thrown in client code
	if (error instanceof Error) {
		return new Error(`${error.message}${suffix}`);
	}

	// fallback
	return new Error(`An unexpected error occurred${suffix}`);
};
