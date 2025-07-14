import type React from "react";
import { useSearchParams } from "react-router-dom";
import { ModalContainer } from "./ModalContainer";

type ModalBridgeProps = {
	searchParam: string;
	children: React.ReactNode;
	title: string;
	width: string;
	height: string;
	titleColor: string;
	onClose?: () => void;
};

export const ModalBridge = ({
	searchParam,
	children,
	title,
	width,
	height,
	titleColor,
	onClose,
}: ModalBridgeProps) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const isOpen = searchParams.get(searchParam) === "true";

	const handleClose = () => {
		searchParams.delete(searchParam);
		setSearchParams(searchParams, { replace: true });
		onClose?.();
	};

	return (
		<ModalContainer
			isOpen={isOpen}
			closeFn={handleClose}
			title={title}
			width={width}
			height={height}
			titleColor={titleColor}
		>
			{children}
		</ModalContainer>
	);
};
