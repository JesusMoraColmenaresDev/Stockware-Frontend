import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:3000",
	headers: {
		"Content-Type": "aplication/json",
		Accept: "aplication/json",
	},
	withCredentials: false,
});
