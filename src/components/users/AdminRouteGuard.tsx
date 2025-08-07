import { Navigate, Outlet } from "react-router-dom";
import { useGetProfileInfo } from "../../api/profileApi";
import { Spinner } from "../Spinner";

export const AdminRouteGuard = () => {
	const { data: profile, isLoading, isError } = useGetProfileInfo();

	if (isLoading) {
		return (
			<div className="flex h-full w-full items-center justify-center">
				<Spinner
					size="20rem"
					colorPrimary="#2C3E50"
					colorSecondary="#3498DB"
				/>
			</div>
		);
	}

	// Si hay un error o no hay perfil, el usuario no está autenticado.
	// Redirigir a la página de login.
	if (isError || !profile) {
		return <Navigate to="/login" replace />;
	}

	// Si el usuario no es admin, redirigir a la página de inicio.
	if (profile?.role !== "admin") {
		return <Navigate to="/" replace />;
	}

	// Si el usuario es admin, renderizar la ruta solicitada.
	return <Outlet />;
};