import { toast, type ToastOptions } from "react-toastify";
import { ToastWrapper, type ToastType } from "../components/toast/ToastWrapper";

const TOAST_WRAPPER_CLASS =
	"backdrop-blur-lg shadow-inner shadow-zinc-600 border border-zinc-900/20 rounded-2xl text-white overflow-visible group p-4 pr-12 sm:pr-14 md:pr-16";
const TOAST_PROGRESS_CLASS = "h-0.5 rounded-b-lg";

/**
 * usage: showToast("success", { title: "Saved", message: "Your changes were saved." })
 * returns the toast id (so you can dismiss/update)
 */
export const showToast = (
	type: ToastType,
	opts?: { title?: string; message?: string } & Partial<ToastOptions>
) => {
	const { title, message, ...toastOpts } = opts ?? {};

	// use the function form so react-toastify injects closeToast to our component
	const id = toast(
		({ closeToast }) => (
			<ToastWrapper
				toastType={type}
				title={title}
				message={message}
				closeToast={closeToast} // pass function directly
			/>
		),
		{
			className: TOAST_WRAPPER_CLASS,
			progressClassName: TOAST_PROGRESS_CLASS,
			closeButton: false,
			autoClose: 2000,
			pauseOnHover: true,
			draggable: true,
			type,
			...toastOpts,
		}
	);

	return id;
};
