import { unzipFile, parseFile, readCodeFromFile } from "../util/ParserUtil";
import * as fs from "fs";

/**
 * The class that represents the individual program files that are uploaded.
 */
export abstract class AbstractProgram {
  listOfCode: string[];
  listOfASTCode: any[];
  todayDate: string;
  nameOfZipFile: string;
  fileVsCode: any[];

  /**
   * To initialize the file and the name of the file to get the code and parse for AST nodes.
   * @param file to be parsed to get the code if the file.
   * @param nameOfZipFile the name of the zip file to be parsed.
   */
  constructor(file: any, nameOfZipFile: string) {
    this.nameOfZipFile = nameOfZipFile;
    this.listOfCode = [];
    this.listOfASTCode = [];
    this.todayDate = (new Date()).valueOf().toString();
    this.saveFileToServer(file);
  }

  /**
   * Function to save the uploaded file to the folder in server.
   * 
   * @param file file to be saved in the server for comparison.
   */
  private saveFileToServer(file: any) {
    fs.writeFileSync("files/zippedFiles/" + this.nameOfZipFile, file);
  }

  /**
   * This function gets the files from the zipped folder and unzips all of them.
   *
   * @param nameOfZipFile the file to be unzipped
   */
  public async getUnZippedFiles() {
    !fs.existsSync("files/unzippedFiles/" + this.todayDate) &&
      fs.mkdirSync("files/unzippedFiles/" + this.todayDate);
    await unzipFile(
      "files/zippedFiles/" + this.nameOfZipFile,
      "files/unzippedFiles/" + this.todayDate + "/" + this.nameOfZipFile
    );
    this.getCodeFromFiles();
  }

  /**
   * This function reads the unzipped files and parses them to get the code from the files.
   *
   */
  private getCodeFromFiles() {
    this.fileVsCode = readCodeFromFile(
      "files/unzippedFiles/" +
      this.todayDate +
      "/" +
      this.nameOfZipFile +
      "/**/*.js"
    );
    fs.unlinkSync("files/zippedFiles/" + this.nameOfZipFile);
    this.getCode();
  }

  /**
   * Function to get code from the uploaded files to start comapring them. 
   */
  private getCode() {
    this.fileVsCode.forEach(element => {
      this.listOfCode.push(element.code);
    });
    this.getAstFromCode();
  }

  /**
   * This fucntion parses the extracted code from the files, to get the AST form
   * of the parsed code.
   *
   */
  private getAstFromCode() {
    for (let i = 0; i < this.fileVsCode.length; i++) {
      this.listOfASTCode.push({ ast: parseFile(this.fileVsCode[i].code), fileName: this.fileVsCode[i].fileName });
    }
  }

  /**
   * Function to get the AST of the extracted files.
   */
  public getAstList() {
    return this.listOfASTCode;
  }

  /**
   * Fucntion to get the Code of the extracted files.
   */
  public getListOfCode() {
    return this.listOfCode;
  }

  /**
   * Function to get the code from the uploaded files to start processing for further 
   * analysis.
   */
  public getFileAndCode() {
    return this.fileVsCode;
  }
}
