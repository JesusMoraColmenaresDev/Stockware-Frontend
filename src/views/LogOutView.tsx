import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/authService";

export default function LogOutView() {
    const navigate = useNavigate();

    useEffect(() => {
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
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Cerrando sesión...</h1>
                <p>Has sido desconectado exitosamente.</p>
                <p className="mt-2 text-sm text-gray-500">
                    Serás redirigido a la página de login en breve.
                </p>
            </div>
        </div>
    );
}