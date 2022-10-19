export class TestSuiteExecutionHistory
{
    constructor(
        public suiteId:string,
        public suiteName: string,
        public suiteDescription:string,
        public suiteStatus:string,
        public url:string,
        public browser:string,
        public createdBy:string,
        public createdDate: Date,
        public updatedBy:string,
        public updatedDate: Date
    )
    {
        
    }
}