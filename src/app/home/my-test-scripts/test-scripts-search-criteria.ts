export class TestScriptSearchCriteria {

    constructor(
        public testScriptsId:number[], 
        public testScripts:String[], 
        public testScriptsCategory:String[], 
        public createdBy: string[],
        public createdDateFrom: Date,
        public createdDateTo: Date,
        public updatedBy: string[],
        public updatedDateFrom: Date,
        public updatedDateTo: Date,
        )
    {

    }
}
