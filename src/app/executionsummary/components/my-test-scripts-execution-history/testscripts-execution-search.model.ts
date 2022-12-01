export class TestScriptsExecutionSearch
{
    constructor(
        public testScriptsExecutionId: string,
        public suiteId: string,
        public testScriptId: string,
        public testScriptsCategory: string[],
        public createdBy:string[],
        public createdDateFrom: Date,
        public createdDateTo: Date,)
    {}
}