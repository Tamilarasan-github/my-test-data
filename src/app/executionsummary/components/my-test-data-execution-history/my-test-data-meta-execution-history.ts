export class TestDataMetaExecutionHistory {
    constructor(
        public id:number,
        public suiteExecutionId: number,
        public suiteId:number,
        public testScriptExecutionId:number,
        public testScriptId:number,
        public testDataMetaId:string,
        public testCaseId:string,
        public testScriptName:string,
        public runFlag:string,
        public testScenario:string,
        public testPriority:number,
        public testCaseCategory:string,
        public jiraId:string,
        public automatedTestStatus:string,
        public manualTestStatus:string,
        public testFailReason:string,
        public testInformation:string,
        public testComments:string,
        public testIgnored:string,
        public executionStatus:string,
        public executionTime:string,
        public executedBy:string,
        public executedOn:string,
        public updatedBy:string,
        public updatedDate:string,
        public deleteFlag:string,
        
    ) 
    {

    }
}