import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRoutes } from "./routes/Routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} position="bottom" />
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick={true}
				pauseOnHover={true}
				pauseOnFocusLoss={false}
				draggable={true}
				theme="light"
				limit={5}
				aria-label="Notificacion"
				toastClassName={""} // applies to the outer wrapper of every toast
				className={""} // antes bodyClassName, the inner message container
				progressClassName={""} // styles the progress bar; !bg-blue-500 uses Tailwind’s important‐override syntax to beat the default.
			/>
			<AppRoutes></AppRoutes>
		</QueryClientProvider>
	</StrictMode>
);
