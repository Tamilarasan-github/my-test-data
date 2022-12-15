export class TestScriptsExecutionHistory
{
    constructor(
        public id:string,
        public suiteExecutionId:string,
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