export const triggerDownload = (
	data: BlobPart | Blob | string,
	filename: string,
	mimeType: string
) => {
	const blob = new Blob([data], { type: mimeType });

	const url = window.URL.createObjectURL(blob);

	const link = document.createElement("a");
	link.href = url;
	link.setAttribute("download", filename);

	document.body.appendChild(link);
	link.click();
	link.parentNode?.removeChild(link);

	window.URL.revokeObjectURL(url);
};
