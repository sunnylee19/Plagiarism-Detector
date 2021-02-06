import IComparisonReport from "../report/IComparisonReport";

/**
 * The interface that is used for comparing the 2 programs and generating the report.
 */
interface IComparison {

    /**
     * The method that initiates the comparison of the 2 programs.
     */
    startComparison(): IComparisonReport;
}

export default IComparison