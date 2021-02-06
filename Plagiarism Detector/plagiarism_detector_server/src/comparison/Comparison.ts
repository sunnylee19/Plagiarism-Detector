import { AbstractProgram } from "../program/AbstractProgram";
import ComparisonReport from "../report/ComparisonReport";
import IComparisonReport from "../report/IComparisonReport";
import IComparison from "./IComparison";
let tstraverse = require('tstraverse');
const END_OF_FILE_KIND = 1;
const SOURCE_FILE_KIND = 290;

/**
 * The implemnetation of IComparison that takes 2 programs and compares them for plagiarism. 
 * The class generates a report which is then displayed to the user.
 */
class Comparison implements IComparison {
    private progrAst1: any[];
    private progrAst2: any[];
    private listOfCode1: string[] = [];
    private listOfCode2: string[] = [];

    /**
     * Initializes the two program files to start the comparison for similar nodes analysis.
     * 
     * @param program1 first program to be compared
     * @param program2 second program to be compared
     */
    constructor(program1: AbstractProgram, program2: AbstractProgram) {
        this.progrAst1 = program1.getAstList();
        this.progrAst2 = program2.getAstList();
        this.listOfCode1 = program1.getListOfCode();
        this.listOfCode2 = program2.getListOfCode();
    }

    /**
     * Starts the comparison process, and returns a IComparisonReport.
     * 
     * @return IComparisonReport the report that represents the list of similarities, 
     * and the similarity percentage.
     */
    startComparison(): IComparisonReport {
        let progMap1: any[] = [];
        let progMap2: any[] = [];
        let totalNodes = -4;//-4 so that we exclude the source file and end of program node
        let count = 0;
        this.progrAst1.forEach(function (ast) {
            tstraverse.traverse(ast.ast, {
                enter: function enter(node: any) {
                    progMap1.push({ node: node, id: count, fileName: ast.fileName });
                    ++totalNodes;
                }
            });
            ++count;
        });

        count = 0;
        this.progrAst2.forEach(function (ast) {
            tstraverse.traverse(ast.ast, {
                enter: function enter(node: any) {
                    progMap2.push({ node: node, id: count, fileName: ast.fileName });
                    ++totalNodes;
                }
            });
            ++count;
        });

        let commonNodes1: any[] = [];
        let commonNodes2: any[] = [];
        for (let i = 0; i < progMap1.length; ++i) {
            let node1 = progMap1[i];
            for (let j = 0; j < progMap2.length; ++j) {
                let node2 = progMap2[j];
                if (node1.node.kind === END_OF_FILE_KIND || node1.node.kind === SOURCE_FILE_KIND ||
                    node2.node.kind === END_OF_FILE_KIND || node2.node.kind === SOURCE_FILE_KIND) {
                    //Need to ignore the source file node and the end of file node
                    continue;
                }
                if (node1.node.kind === node2.node.kind) {
                    if (!commonNodes1.includes(node1) && !commonNodes2.includes(node2)) {
                        commonNodes1.push(node1);
                        commonNodes2.push(node2);
                        break;
                    }
                }
            }
        }
        return new ComparisonReport(commonNodes1, commonNodes2, this.listOfCode1, this.listOfCode2, totalNodes);
    }
}

export default Comparison