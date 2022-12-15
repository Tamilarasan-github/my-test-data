export class SuiteExecutionSearch
{
    constructor(
        public executionId:string,
        public suiteId:string,
        public suiteName: string,
        public suiteStatus:string[],
        public url:string,
        public executedBy:string[],
        public executedDateFrom: Date,
        public executedDateTo: Date,
    )
    {

    }
}