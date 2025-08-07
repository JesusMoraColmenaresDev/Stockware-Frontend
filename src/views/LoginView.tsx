import { useForm } from "react-hook-form";
import { UserSchemaAuth, type typeUser } from "../types";
import AuthenticationForm from "../components/AuthenticationForm";
import { login } from "../api/authService";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginView() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<typeUser>({
		resolver: zodResolver(UserSchemaAuth),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const navigate = useNavigate();
	const onSubmit = async (data: typeUser) => {
		try {
			await login(data);
			reset();
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="bg-bg-secondary min-h-screen w-screen flex flex-col gap-8 items-center justify-center p-4">
				<div className="relative w-full max-w-md">
					<img
						src="/public/StockWare_Logo.png"
						className="max-w-[9rem] object-contain absolute bottom-full left-1/2 -translate-x-1/2 mb-4"
						alt="Stockware Logo"
					/>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="bg-bg-main w-full flex flex-col px-8 py-8 gap-8 rounded-lg"
					>
						<AuthenticationForm
							errors={errors}
							register={register}
							isSignUp={false}
						></AuthenticationForm>
					</form>

					<p className="text-center mt-4 text-text">
						Don't have an account?{" "}
						<Link
							to="/signup"
							className="font-bold text-bg-button-primary hover:underline"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
