export class SuiteExecutionSearch
{
    constructor(
        public suiteId:string,
        public suiteName: string,
        public suiteStatus:string[],
        public url:string,
        public createdBy:string[],
        public createdDateFrom: Date,
        public createdDateTo: Date,
    )
    {

    }
}