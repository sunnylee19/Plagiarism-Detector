import { expect } from "chai";
import { JavaScriptProgram } from "../src/program/JavaScriptProgram";
import * as fs from "fs";

describe("Tests for upload zip files", () => {
    
    /**
     * Method to read the test file.
     * 
     * @param file file to read for testing.
     */
    function readFile(file:any){
        return fs.readFileSync('tests/test files/'+ file)   
    }

    /**
     * Method to check if the code from the file was read or not.
     * 
     * @param prog the program that needs to checked.
     */
    function checkResultForSingleFile (prog:any){
        if (prog.getListOfCode().length > 0){
            return "Passed";
        }
        else{
           return "Not Passed";
        }
    } 

    /**
     * Method to check if the code got parsed and AST was genearted.
     * 
     * @param prog the program that needs to checked.
     */
    function checkResultForMultiFile (prog:any){
        if (prog.getAstList().length >= 2){
            return "Passed";
        }
        else{
           return "Not Passed";
        }
    } 

    it("Test for file extraction and parsing of code to check AST",async function() {
        let program = new JavaScriptProgram(readFile('prog1.zip'),'prog1');
        await program.getUnZippedFiles();
        expect(checkResultForSingleFile (program)).to.equal("Passed");
        
    });

    it("Test for file extraction and get code",async function() {
        let program = new JavaScriptProgram(readFile('prog1.zip'),"prog1");
        await program.getUnZippedFiles();
        let result:string;
        if (program.getFileAndCode().length > 0){
            result="Passed";
        }
        else{
            result= "Not Passed";
        }
        expect(result).to.equal("Passed");        
    });

    it("Test if no file exists in the zip file",async function() {
        let program = new JavaScriptProgram(readFile('emptyzip.zip'),"emptyzip");
        await program.getUnZippedFiles();
        expect(checkResultForSingleFile (program)).to.equal("Not Passed");
        
    });

    it("Test if different file type exists in the zip (has python file inside)",async function() {
        let program = new JavaScriptProgram(readFile('prog2.zip'),"prog2");
        await program.getUnZippedFiles();
        expect(checkResultForSingleFile (program)).to.equal("Not Passed");
        
    });

    it("Test with nested folders",async function() {
        let program = new JavaScriptProgram(readFile('prog3.zip'),"prog3");
        await program.getUnZippedFiles();
        expect(checkResultForSingleFile (program)).to.equal("Passed");
    });

    it("Test file with no code",async function() {
        let program = new JavaScriptProgram(readFile('prog4.zip'),"prog4");
        await program.getUnZippedFiles();
        let result ="";
        if (program.getListOfCode().length = 1){
            result= "Passed";
        }
        else{
            result= "Not Passed";
        }
        expect(result).to.equal("Passed");
    });

// Testing multifile

it("Test for file extraction and get AST for multiple file",async function() {
    let program = new JavaScriptProgram(readFile('prog11.zip'),"prog11");
    await program.getUnZippedFiles();
    expect(checkResultForMultiFile(program)).to.equal("Passed");
    
});

it("Test if different file type exists in the zip for multiple file",async function() {
    let program = new JavaScriptProgram(readFile('prog22.zip'),"prog22");
    await program.getUnZippedFiles();
    expect(checkResultForMultiFile (program)).to.equal("Not Passed");
    
});

it("Test if multiple file exist in nested folder",async function() {
    let program = new JavaScriptProgram(readFile('prog33.zip'),"prog33");
    await program.getUnZippedFiles();
    expect(checkResultForMultiFile (program)).to.equal("Passed");
    
});

})