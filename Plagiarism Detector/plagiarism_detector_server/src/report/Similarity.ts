import ISimilarity from "./ISimilarity";

/**
 * This class represents a similarity. A similarity is between portions of 2 different program.
 * The portion of the two programs that are similar are stored here.
 */
class Similarity implements ISimilarity {
    private title: string;
    private start1: number;
    private start2: number;
    private end1: number;
    private end2: number;
    private fileIndex1: number;
    private fileIndex2: number;

    /**
     * Constructor to create a similarity object.
     * 
     * @param similarNode1 the node from submission one that the similarity is present in.
     * @param similarNode2 the node from submission two that the similarity is present in.
     * @param fileIndex1 the index of the file from submission 1 the similarity is present in.
     * @param fileIndex2 the index of the file from submission 2 the similarity is present in.
     * @param fileName1 the name of the file the similarity is present in.
     * @param fileName2 the name of the file the similarity is present in.
     * @param prog1 the string representation of the code from the file in submssion 1.
     * @param prog2 the string representation of the code from the file in submssion 2.
     */
    constructor(similarNode1: any, similarNode2: any, fileIndex1: number, fileIndex2: number,
        fileName1: string, fileName2: string, prog1: string, prog2: string) {
        this.start1 = this.getLineNumber(similarNode1.pos, prog1);
        this.start2 = this.getLineNumber(similarNode2.pos, prog2);
        this.end1 = this.getLineNumber(similarNode1.end, prog1);
        this.end2 = this.getLineNumber(similarNode2.end, prog2);
        this.title = this.setTitle(fileName1, fileName2);
        this.fileIndex1 = fileIndex1;
        this.fileIndex2 = fileIndex2;
    }

    /**
     * Method to get the title of the similarity.
     */
    getTitle(): string {
        return this.title;
    }

    /**
     * Helper method to get the line number the similarity is on in the code file.
     * @param index the index of the code we are finding the line number for.
     * @param program the code from the file in string format.
     */
    private getLineNumber(index: number, program: string): number {
        let tempStr = program.substring(0, index);
        return tempStr.split('\n').length;
    }

    /**
     * Helper function to set a title for the similarity.
     * @param fileName1 name of the file from submission 1 that the similarity is present in.
     * @param fileName2 name of the file from submission 2 that the similarity is present in.
     */
    private setTitle(fileName1: string, fileName2: string): string {
        return "Program 1, File: " + fileName1 + " " + " (" + this.start1 + " - " + this.end1 + ")       Program 2, File: "
            + fileName2 + " " + " (" + this.start2 + " - " + this.end2 + ")";
    }

    /**
     * Method to convert the Similarity to JSON format.
     */
    getJson() {
        return {
            title: this.title,
            start1: this.start1,
            start2: this.start2,
            end1: this.end1,
            end2: this.end2,
            fileIndex1: this.fileIndex1,
            fileIndex2: this.fileIndex2
        }
    }
}

export default Similarity;