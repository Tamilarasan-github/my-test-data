export class TestDataSearchCriteria
{
    constructor(
        public testDataMetaId:number[],
        public testCaseId:string[],
        public jiraId:string[],
        public runFlag:string[],
        public testScriptName:string[],
        public testShortDescription:string,
        public testPriority:string[],
        public testCategory:string[],
        public createdBy:string[],
        public createdFrom: Date,
        public createdTo: Date,
        public updatedBy:string[],
        public updatedFrom: Date,
        public updatedTo: Date
    )
    {}
}