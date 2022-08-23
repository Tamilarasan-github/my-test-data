export class TestScriptsExecutionHistory
{
    constructor(
        public testScriptExecutionId:string,
        public suiteId:string,
        public testScriptsId: string,
        public testScriptsName: string,
        public testScriptsCategory:string,
        public testScriptsDescription:string,
        public createdBy:string,
        public createdDate: Date
    )
    {
        
    }
}