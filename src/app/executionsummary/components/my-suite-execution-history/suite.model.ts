import { ExecutionInputValues } from "src/app/suite/execution-input-values";
import { TestDataFilter } from "src/app/suite/test-data-filter";

export class TestSuiteExecutionInfo
{
    constructor(
        public executionId: number,
        public suiteId: number,
        public suiteName: string,
        public suiteDescription:string,
        public suiteStatus:string,
        public url:string,
        public browser:string,
        public executedBy:string,
        public executedDate: Date,
        public updatedBy:string,
        public updatedDate: Date
    )
    {
        
    }
}

export class TestSuiteExecutionRequest
{
    constructor(public testSuiteExecutionInfo: TestSuiteExecutionInfo, 
        public executionInputValues: ExecutionInputValues[],
        public testDataFilter: TestDataFilter)
    {

    }
}