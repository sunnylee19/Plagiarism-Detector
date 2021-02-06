import { AbstractProgram } from "./AbstractProgram";

/**
 * This class represents a file that is uploaded and is written in javascript.
 */
export class JavaScriptProgram extends AbstractProgram {
    filename: string;

    /**
     * Represents  a constructor to set javascript file to the uploaded and the name of the file to 
     * reading from file and comparison.
     * 
     * @param file uploaded javascript file by the user, to analyse.
     * @param nameOfZipFile 
     */
    constructor(file: any, nameOfZipFile: string) {
        super(file, nameOfZipFile);
        this.nameOfZipFile = nameOfZipFile;
    }

}
