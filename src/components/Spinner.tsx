type SpinnerProps = {
	/**  Tamaño a usar en general ya sea px rem, pero NO %, default 10.25rem, su valor original */
	size?: string;
	/**  Un Color compatible con tailwind a usar, puede ser un #, rgb, o una clase, default white */
	colorPrimary?: string;
	/**  Un Color compatible con tailwind a usar, puede ser un #, rgb, o una clase default red */
	colorSecondary?: string;
};

/** Un Span Simple ligeramente customizable */
export const Spinner = ({
	size = "10.25rem",
	colorPrimary = "white",
	colorSecondary = "red",
}: SpinnerProps) => {
	return (
		<span
			className="spinner"
			style={
				// Pa que TailWind no los purgue despues y se pueda modificar apropiadamente
				{
					"--spinner-size": size,
					"--spinner-color-primary": colorPrimary,
					"--spinner-color-secondary": colorSecondary,
				} as React.CSSProperties
			}
		></span>
	);
};
