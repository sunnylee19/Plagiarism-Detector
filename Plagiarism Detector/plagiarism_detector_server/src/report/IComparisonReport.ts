import ISimilarity from "./ISimilarity";

/**
 * The interface for the comparison report that has the details about which lines in the programs were plagiarised 
*/
interface IComparisonReport {
    /**
     * A method used to return a similarity present in the report.
     * @param index the index of the similarity that is to be returned.
     */
    getSimilarity(index: any): ISimilarity;

    /**
     * Method to get the total number of similar nodes count for the uploaded files.
     */
    getSimilarityCount(): number;

    /**
     * Method to get the percentage score of how similar 2 submissions are.
     */
    getPercentageSimilar(): string;

    /**
     * Method to get the notes that have been added to a report.
     */
    getNote(): string;

    /**
     * Function to add a note to the report.
     * 
     * @param note the note that is added to the report.
     */
    updateNote(note: string): void;

    /**
     * Method to convert the report to JSON.
     */
    getJson(): any;
}

export default IComparisonReport