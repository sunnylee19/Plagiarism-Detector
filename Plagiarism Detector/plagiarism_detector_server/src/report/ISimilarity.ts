/**
 * This interface repersents the similarities between 2 programs. The parts of the program
 * that are plagiarised are stored here.
 */

interface ISimilarity {
    /**
     * Method to convert the Similarity to JSON format.
     */
    getJson(): any;

    /**
     * Method to get the name of the file in which the similarity exists.
     */
    getTitle(): string;
}

export default ISimilarity