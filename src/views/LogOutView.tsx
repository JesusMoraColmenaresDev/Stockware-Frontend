import { useNavigate } from "react-router-dom";
import { logout } from "../api/authService";
import { useQueryClient } from "@tanstack/react-query";

export default function LogOutView() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	
	/*useEffect(() => {
        // 1. Define una función asíncrona dentro del useEffect.
        const performLogout = async () => {
            try {
                // 2. Llama a tu función asíncrona para cerrar sesión.
                await logout();
            } catch (error) {
                console.error("Error al cerrar sesión:", error);
            } finally {
                // 3. Redirige al usuario al login, incluso si hubo un error.
                navigate("/login");
            }
        };

        // 4. Llama a la función asíncrona.
        performLogout();
    }, [navigate]);*/

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error("Error al cerrar sesión:", error);
		} finally {
			queryClient.clear(); // Limpia toda la caché de React Query
			navigate("/login");
		}
	};

	return (
		<div className="bg-bg-secondary min-h-screen w-screen flex items-center justify-center p-4">
			<div className="bg-bg-main w-full max-w-md flex flex-col px-8 py-12 gap-12 rounded-lg">
				<div className="text-text text-[32px] font-bold text-center">
					warning
				</div>
				<p className="text-text text-[24px] font-semibold text-center opacity-70">
					Are you sure you want to log out and finish?
				</p>

				<div className="flex flex-col gap-[16px] items-center">
					<button
						onClick={handleLogout}
						className="px-[3rem] py-[2px] rounded-lg bg-bg-button-primary text-bg-secondary font-bold hover:bg-bg-button-secondary text-lg w-fit"
					>
						Log out
					</button>
					<button
						onClick={() => navigate("/")}
						className="px-[3rem] py-[2px] rounded-lg bg-bg-button-delete text-bg-secondary font-bold hover:bg-deleteHover text-lg w-fit"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
