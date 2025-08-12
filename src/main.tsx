import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRoutes } from "./routes/Routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./styles/index.css";
import { AppToaster } from "./components/toast/ToastWrapper";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} position="bottom" />
			<AppToaster /> {/* Personal Modified Toast */}
			<AppRoutes></AppRoutes>
		</QueryClientProvider>
	</StrictMode>
);
