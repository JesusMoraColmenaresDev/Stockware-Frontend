/**
 * A dynamic gradient bar with adjustable corner radius.
 * @param {string} className - Tailwind classes for size, color, etc.
 * @param {number} cornerRadius - The corner radius (0 to 0.5). Defaults to 0.5 (pill shape).
 */
type SVGRectangleProps = {
	className: string;
};

export const SVGRectangle = ({ className }: SVGRectangleProps) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1 100"
			preserveAspectRatio="none"
			aria-hidden="true"
		>
			<defs>
				<linearGradient id="dynamic-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop
						offset="0%"
						style={{ stopColor: "currentColor", stopOpacity: 0.5 }}
					/>
					<stop
						offset="100%"
						style={{ stopColor: "currentColor", stopOpacity: 1 }}
					/>
				</linearGradient>
			</defs>
			<rect x="0" y="0" width="1" height="100" fill="url(#dynamic-gradient)" />
		</svg>
	);
};
