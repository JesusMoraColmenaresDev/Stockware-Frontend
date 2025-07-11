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
};

const onClose = () => {
	console.log("close");
};

export const ModalBridge = ({
	searchParam,
	children,
	title,
	width,
	height,
	titleColor,
}: ModalBridgeProps) => {
	const [searchParams] = useSearchParams();
	const isOpen = searchParams.get(searchParam) === "true";

	return (
		<ModalContainer
			isOpen={isOpen}
			closeFn={onClose}
			title={title}
			width={width}
			height={height}
			titleColor={titleColor}
		>
			{children}
		</ModalContainer>
	);
};
