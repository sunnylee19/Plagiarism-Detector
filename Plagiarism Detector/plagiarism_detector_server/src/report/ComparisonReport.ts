import IComparisonReport from "./IComparisonReport";
import ISimilarity from "./ISimilarity";
import Similarity from "./Similarity";
import ExportPdf from "../exportpdf/ExportPdf";

/**
 * The implementation of the IComparisonReport interface. This is the report that is shown to the user.
 */
class ComparisonReport implements IComparisonReport {
    private similarities: ISimilarity[];
    private note: string;
    private percentSimilar: string;

    /**
     * Constructor to construct a report.
     * 
     * @param commonNodes1 the list of nodes from submission 1 that are common.
     * @param commonNodes2 the list of nodes from submission 2 that are common.
     * @param listOfCode1 list of the programs from submission 1 as an array of strings.
     * @param listOfCode2 list of the programs from submission 2 as an array of strings.
     * @param totalNodes total nodes that are present in all nodes of both submissions.
     */
    constructor(commonNodes1: any[], commonNodes2: any[], listOfCode1: string[], listOfCode2: string[], totalNodes: number) {
        this.similarities = [];
        this.note = "";
        this.percentSimilar = this.getPercentageSimilarity(commonNodes1, commonNodes2, totalNodes);
        this.constructReport(commonNodes1, commonNodes2, listOfCode1, listOfCode2);
    }

    /**
     * Method to get the percentage score of how similar 2 submissions are.
     */
    getPercentageSimilar(): string {
        return this.percentSimilar;
    }

    /**
     * Method to get the notes that have been added to a report.
     */
    getNote(): string {
        return this.note;
    }

    /**
     * Helper function to get the percentage of similarity between the submissions.
     * 
     * @param commonNodes1 the list of nodes from submission 1 that are common.
     * @param commonNodes2 the list of nodes from submission 2 that are common.
     * @param totalNodes total nodes that are present in all nodes of both submissions.
     */
    private getPercentageSimilarity(commonNodes1: any[], commonNodes2: any[], totalNodes: number): string {
        return ((commonNodes1.length + commonNodes2.length) * 100 / totalNodes).toFixed(2);
    }

    /**
     * Helper method to construct the report.
     * 
     * @param commonNodes1 the list of nodes from submission 1 that are common. 
     * @param commonNodes2 the list of nodes from submission 2 that are common. 
     * @param listOfCode1 list of the programs from submission 1 as an array of strings.
     * @param listOfCode2 list of the programs from submission 2 as an array of strings.
     */
    private constructReport(commonNodes1: any[], commonNodes2: any[], listOfCode1: string[], listOfCode2: string[]) {
        for (let i = 0; i < commonNodes1.length; ++i) {
            let node1 = commonNodes1[i].node;
            let node2 = commonNodes2[i].node;
            let fileName1 = commonNodes1[i].fileName;
            let fileName2 = commonNodes2[i].fileName;
            let id1 = commonNodes1[i].id;
            let id2 = commonNodes2[i].id;
            this.similarities.push(new Similarity(node1, node2, id1, id2, fileName1,
                fileName2, listOfCode1[id1], listOfCode2[id2]));
        }
    }

    /**
     * Method to update the notes in the report.
     * 
     * @param note the note that is being updated.
     */
    updateNote(note: string): void {
        this.note = note;
    }

    /**
     * Method to get the JSON representation of the the report.
     */
    getJson(): any {
        let json = {
            similarities: this.similarities.map(function (element) {
                return element.getJson()
            }),
            note: this.note,
            percentSimilar: this.percentSimilar
        };
        return json;
    }

    /**
     * Method to get the similarity from the report.
     * 
     * @param index the index of the similarity that is required.
     */
    getSimilarity(index: any): ISimilarity {
        return this.similarities[index];
    }

    /**
     * Method to get the total number of similarities in the report.
     */
    getSimilarityCount(): number {
        return this.similarities.length;
    }
}

export default ComparisonReport;