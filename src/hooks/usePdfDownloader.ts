import { useState } from "react";
import { triggerDownload } from "../utils/downloadPdfUtils";
import { showToast } from "../helpers/showToast";

export const usePdfDownloader = (
	apiCall: () => Promise<{ data: unknown }>,
	fileName: string
) => {
	const [isDownloading, setIsDownloading] = useState(false);

	const downloadPdf = async () => {
		setIsDownloading(true);
		try {
			const response = await apiCall();
			triggerDownload(response.data, fileName, "application/pdf");
		} catch (error) {
			showToast("error", {
				message: `Error downloading ${fileName}:`,
			});
			console.error(`Error downloading ${fileName}:`, error);
		} finally {
			setIsDownloading(false);
		}
	};

	return { isDownloading, downloadPdf };
};
