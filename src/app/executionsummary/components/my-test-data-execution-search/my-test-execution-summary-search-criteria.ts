export class TestExecutionSummarySearchCriteria
{
    constructor(
        public testDataExecutionId:  string,
        public suiteId:  string,
        public testScriptExecutionId:  string,
        public testDataMetaId:  string,
        public testDataStatus:  string[],
        public testCategory:  string[],
        public jiraStory:  string,
        public testScripts:  string,
        public testShortDescription:  string,
        public executedBy:  string[],
        public executedDateFrom:  Date,
        public executedDateTo:  Date
    )
    {
        
    }
}