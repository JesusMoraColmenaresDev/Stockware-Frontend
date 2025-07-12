import { useNavigate } from "react-router-dom";

type ModalButtonProps = {
	/** Default is "", so it will just clean the current url from search params, should be like "searchParam" */
	searchParam?: string;
	text: string;
	openModal: boolean;
	classNameInyect: string;
	clickFn?: () => void;
	disabled: boolean;
};
export const ModalButton = ({
	text,
	searchParam,
	openModal,
	classNameInyect,
	clickFn = () => {},
	disabled,
}: ModalButtonProps) => {
	const navigate = useNavigate();

	return (
		<button
			disabled={disabled}
			className={`flex ${classNameInyect} rounded-lg ${
				openModal
					? "bg-bg-button-primary hover:bg-bg-button-secondary"
					: "bg-bg-button-delete hover:bg-bg-button-delete-hover"
			} text-bg-secondary  ${disabled && "opacity-20"} justify-center`}
			onClick={() => {
				clickFn();
				navigate(searchParam ? `?${searchParam}=true` : "", { replace: true });
			}}
		>
			{text}
		</button>
	);
};
