import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";

type ModalContainerProps = {
	children: React.ReactNode;
	closeFn: () => void;
	isOpen: boolean;
	title: string;
	titleColor: string;
	width?: string;
	height?: string;
};

export const ModalContainer = ({
	children,
	closeFn,
	isOpen,
	title,
	titleColor,
	width = "",
	height = "",
}: ModalContainerProps) => {
	return (
		<Dialog
			onClose={() => closeFn()}
			open={isOpen}
			className="relative z-50"
			aria-hidden="true"
			as="div"
		>
			<DialogBackdrop className="fixed inset-0 bg-black/50">
				<div className="fixed inset-0 flex items-center justify-center">
					<DialogPanel
						className={`px-[2rem] py-[1rem] bg-bg-main rounded-2xl ${width} ${height}`}
					>
						<DialogTitle
							className={`${titleColor} text-4xl text-center font-bold`}
						>
							{title}
						</DialogTitle>
						{children}
					</DialogPanel>
				</div>
			</DialogBackdrop>
		</Dialog>
	);
};
