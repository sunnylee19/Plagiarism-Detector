import { expect } from "chai";
import { JavaScriptProgram } from "../src/program/JavaScriptProgram";
import * as fs from "fs";
import Comparison from "../src/comparison/Comparison";
import IComparisonReport from "../src/report/IComparisonReport";

describe("Tests for similarity check", () => {
  function readFile(folderAttribute: any, file: any) {
    return fs.readFileSync(
      "tests/test files/Multiple files/" + folderAttribute + "/" + file
    );
  }

  /**
   * Method  to check if similarity count is greater than 0.
   * 
   * @param report the report which has the similarity count.
   */
  function similarityExists(report: IComparisonReport) {
    if (report.getSimilarityCount() > 0) {
      return "Passed";
    } else {
      return "Not Passed";
    }
  }

  /**
   * Method to check if similarity is greater than 55 or not.
   * 
   * @param report the report which has the similarity percentage
   *  to be compared to.
   */
  function checkSimilaritygreater55(report: IComparisonReport) {
    if (
      similarityExists(report) === "Passed" &&
      +report.getPercentageSimilar() > 55
    ) {
      return "Passed";
    } else {
      return "Not Passed";
    }
  }

  /**
   * Method to initialize the file and start comparison.
   * @param testScenario the functionality we are testing 
   */
  async function processFilesAndCompare(
    testScenario:string
  ) {
    let program1 = new JavaScriptProgram(
        readFile(testScenario, "Student 1.zip"),
        "Student1"
      );
      let program2 = new JavaScriptProgram(
        readFile(testScenario, "Student 2.zip"),
        "Student2"
      );
    await program1.getUnZippedFiles();
    await program2.getUnZippedFiles();
    let firstComaprison = new Comparison(program1, program2);
    return firstComaprison.startComparison();
  }

  it("Test for similarity percentage with renamed attributes", async function () {
    let report = await processFilesAndCompare("Renamed attributes");
    expect(checkSimilaritygreater55(report)).to.equal("Passed");
  });

  it("Test for similarity percentage with changed loops", async function () {
   
    let report = await processFilesAndCompare("Changed loops");
    if (report.getSimilarity(0) != null) {
      expect(checkSimilaritygreater55(report)).to.equal("Passed");
    } else {
      expect(checkSimilaritygreater55(report)).to.equal("Not Passed");
    }
  });

  it("Test for similarity percentage with derived files", async function () {
    let report = await processFilesAndCompare("Derived files");
    expect(checkSimilaritygreater55(report)).to.equal("Passed");
  });

  it("Test for similarity percentage with extracted methods", async function () {
let report = await processFilesAndCompare("Extracted methods");
    expect(checkSimilaritygreater55(report)).to.equal("Passed");
  });

  it("Test for similarity percentage with identical files", async function () {
  let report = await processFilesAndCompare("Identical");
    expect(checkSimilaritygreater55(report)).to.equal("Passed");
  });

  it("Test for similarity percentage with modified comments", async function () {
    let report = await processFilesAndCompare("Modified comments");
    expect(checkSimilaritygreater55(report)).to.equal("Passed");
  });

  it("Test for similarity percentage with moved functions", async function () {
    let report = await processFilesAndCompare("Moved functions");
    expect(checkSimilaritygreater55(report)).to.equal("Passed");
  });

  it("Test for similarity percentage with adding notes", async function () {
   let report = await processFilesAndCompare("Moved functions");
    report.updateNote("Line 45-65 is a given code in assignment");
    expect(report.getNote()).to.equal(
      "Line 45-65 is a given code in assignment"
    );
    report.updateNote("Line 105-122 is a given code in assignment");
    expect(report.getNote()).to.equal(
      "Line 105-122 is a given code in assignment"
    );
  });
  it("Test to get the Json format of the report", async function () {
    let report = await processFilesAndCompare("Moved functions");
    expect(JSON.stringify(report.getJson()) != null).to.equal(true);
  });

  it("Test to get the title of the report", async function () {
    let report = await processFilesAndCompare("Identical");

    expect(report.getSimilarity(0).getTitle()).to.equal(
      "Program 1, File: file1.js  (1 - 1)       Program 2, File: file1.js  (1 - 1)"
    );
  });
});
