export class TestDataSearchCriteria
{
    constructor(
        public testDataMetaId:number[],
        public testCaseId:string[],
        public jiraId:string[],
        public runFlag:string[],
        public testScripts:string[],
        public testShortDescription:string[],
        public testPriority:string[],
        public testCategory:string[],
        public createdBy:string[],
        public testDataCreatedFromDate: Date,
        public testDataCreatedToDate: Date,
        public updatedBy:string[],
        public testDataUpdatedFromDate: Date,
        public testDataUpdatedToDate: Date
    )
    {}
}