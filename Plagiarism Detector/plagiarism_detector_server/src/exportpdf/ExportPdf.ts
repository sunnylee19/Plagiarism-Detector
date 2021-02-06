import IComparisonReport from "../report/IComparisonReport";

const pdfDoc = require("pdfkit");
const fs = require('fs');

export default function exportReport(report: IComparisonReport): PDFKit.PDFDocument {
    const pdf = new pdfDoc();
    //pdf.pipe(fs.createWriteStream("Report.pdf"));
    let count = report.getSimilarityCount();
    pdf.text("Similarity Report Summary\n\n\n");
    pdf.text("Percentage Similar: " + report.getPercentageSimilar() + "%\n\n\n");
    pdf.text("Similarities: \n\n");
    for (let i = 0; i < count; ++i) {
        let similarity = report.getSimilarity(i);
        pdf.text((i + 1) + ". " + similarity.getTitle());
    }
    pdf.text("\n\n\n\nNotes: \n\n");
    pdf.text(report.getNote());
    pdf.end();
    return pdf;
}