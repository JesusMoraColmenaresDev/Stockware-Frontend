import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SVGRectangle } from "./SVGRectangle";

export type ToastType = "success" | "error" | "warning" | "info";

const typeColorClass: Record<ToastType, string> = {
	success: "text-success", // matches your config key "sucess"
	error: "text-red-500",
	warning: "text-accent",
	info: "text-blue-500",
};

type ToastWrapperProps = {
	toastType: ToastType;
	title?: string;
	message?: string;
	closeToast: () => void;
};

/** Minimal toast content: do not repeat wrapper styles here */
export const ToastWrapper = ({
	toastType,
	title,
	message,
	closeToast,
}: ToastWrapperProps) => {
	const colorClass = typeColorClass[toastType];

	return (
		<div className="relative flex w-full items-start gap-3 text-white">
			{/* Only per-type class here is the color for the svg (uses currentColor) */}
			<SVGRectangle
				className={`h-[4rem] w-[1.5rem] flex-shrink-0 rounded-md ${colorClass}`}
			/>

			<div className="flex-1 min-w-0">
				<div className="flex flex-col">
					<h1 className={`font-bold leading-tight ${colorClass}`}>
						{title ? title : `${toastType.toUpperCase()}!`}
					</h1>
					{message && (
						<p
							className={`text-sm text-text font-semibold multiline-ellipsis`}
							title={message}
						>
							{message}
						</p>
					)}
				</div>
			</div>

			{/* Close button uses closeToast passed from react-toastify render-prop */}
			<button
				onClick={closeToast}
				aria-label="Close Notification"
				title="Cerrar"
				className="absolute left-0 top-0 -translate-x-[140%] -translate-y-[50%] inline-grid place-items-center rounded-full w-8 h-8 sm:w-9 sm:h-9 text-black bg-transparent hover:bg-accent/90 opacity-90 transition-opacity hover:opacity-100 z-30"
			>
				<svg
					viewBox="0 0 16 16"
					className="w-3.5 h-3.5 sm:w-4 sm:h-4"
					aria-hidden="true"
					focusable="false"
				>
					<g
						stroke="currentColor"
						strokeWidth="1.25"
						strokeLinecap="round"
						strokeLinejoin="round"
						fill="none"
					>
						<path d="M4 4 L12 12" />
						<path d="M12 4 L4 12" />
					</g>
				</svg>
			</button>
		</div>
	);
};

/** Mount this once (App.tsx root) */
export function AppToaster() {
	return (
		<ToastContainer
			position="top-right" // keep top-right in code; toast-overrides.css moves it under md
			// you can keep other global defaults here if you want
			autoClose={2000}
			hideProgressBar={false}
			newestOnTop
			closeOnClick
			pauseOnHover
			pauseOnFocusLoss={false}
			draggable
			limit={5}
			toastClassName={undefined} // we pass per-toast class via toast() call
			className={undefined}
			progressClassName={undefined}
		/>
	);
}
