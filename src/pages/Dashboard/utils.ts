import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";

export async function exportMultipleChartsToPdf() {
	const doc = new jsPDF("p", "px");

	const elements = document.getElementsByClassName("custom-chart");

	await creatPdf({ doc, elements });

	doc.save(`charts.pdf`);
}

export async function exportMultipleLineChartToPdf() {
	const doc = new jsPDF("p", "px");

	const elements = document.getElementsByClassName("custom-LineChart");

	await creatPdf({ doc, elements });

	doc.save(`lineChart.pdf`);
}

export async function exportMultiplePieChartToPdf() {
	const doc = new jsPDF("p", "px");

	const elements = document.getElementsByClassName("custom-PieChart");

	await creatPdf({ doc, elements });

	doc.save(`pieChart.pdf`);
}

export async function exportMultipleDountChartToPdf() {
	const doc = new jsPDF("p", "px");

	const elements = document.getElementsByClassName("custom-DountChart");

	await creatPdf({ doc, elements });

	doc.save(`dountChart.pdf`);
}

export async function exportMultiplePolarChartToPdf() {
	const doc = new jsPDF("p", "px");

	const elements = document.getElementsByClassName("custom-PolarChart");

	await creatPdf({ doc, elements });

	doc.save(`polarChart.pdf`);
}

async function creatPdf({ doc, elements, }: { doc: jsPDF; elements: HTMLCollectionOf<Element>; }) {
	const padding = 40;
	const marginTop = 50;
	let top = marginTop;

	for (let i = 0; i < elements.length; i++) {
		const el = elements.item(i) as HTMLElement;
		const imgData = await htmlToImage.toPng(el);

		let elHeight = el.offsetHeight;
		let elWidth = el.offsetWidth;

		const pageWidth = doc.internal.pageSize.getWidth();

		if (elWidth > pageWidth) {
			const ratio = pageWidth / elWidth;
			elHeight = elHeight * ratio - padding * 3;
			elWidth = elWidth * ratio - padding * 3;
		}

		const pageHeight = doc.internal.pageSize.getHeight();

		if (top + elHeight > pageHeight) {
			doc.addPage();
			top = marginTop;
		}

		doc.addImage(imgData, "PNG", padding, top, elWidth, elHeight, `image${i}`);
		top += elHeight + marginTop;
	}
}