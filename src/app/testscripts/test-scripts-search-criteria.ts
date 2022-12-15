export class TestScriptSearchCriteria {

    constructor(
        public testScriptsId:string, 
        public testScripts:string, 
        public testScriptsCategory:string[], 
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
