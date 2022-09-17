export class TestScript {

    constructor(
        public testScriptsId:number, 
        public testScripts:string, 
        public testScriptsCategory:string, 
        public testScriptsDescription:string,
        public createdBy: string,
        public createdDate: string,
        public updatedBy: string,
        public updatedDate: string,
        public deleteFlag: string
        )
    {

    }
}
