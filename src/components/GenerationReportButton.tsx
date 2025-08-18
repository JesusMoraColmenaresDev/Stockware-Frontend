import { showToast } from "../helpers/showToast";

export default function GenerationReportButton(
	downloadPdf: () => void,
	isDownloading: boolean
) {
	return (
		<button
			onClick={() => {
				downloadPdf();
				showToast("info", {
					title: "Generating Report",
					message: "The PDF report is being generated.",
				});
			}}
			disabled={isDownloading}
			className={`max-md:text-sm max-md:px-[1rem] max-md:py-[0.5rem] text-bg-secondary bg-bg-button-primary hover:bg-bg-button-secondary px-[2rem] py-[1rem] text-lg font-bold rounded-lg whitespace-nowrap ${
				isDownloading && "opacity-20 "
			}`}
		>
			{isDownloading ? " Generando PDF" : "Generar reporte"}
		</button>
	);
}
