export default function GenerationReportButton( downloadPdf : () => {} , isDownloading : boolean) {
  return (
    <button
        onClick={downloadPdf}
		disabled={isDownloading}
        className={`text-bg-secondary bg-bg-button-primary hover:bg-bg-button-secondary px-[2rem] py-[1rem] text-lg font-bold rounded-lg whitespace-nowrap ${isDownloading && 'opacity-20 '}`}
    >

        {isDownloading ? ' Generando PDF' : 'Generar reporte'}
    </button>
  )
}
