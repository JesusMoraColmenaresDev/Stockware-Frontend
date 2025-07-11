import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/authService";

export default function LogOutView() {
	const navigate = useNavigate();

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
			navigate("/login");
		}
	};

	return (
		<div className="bg-bg-secondary h-screen w-screen flex items-center justify-center">
			<div className="bg-bg-main min-w-1/3 flex flex-col px-[36px] py-[48px] gap-[48px] rounded-lg">
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
