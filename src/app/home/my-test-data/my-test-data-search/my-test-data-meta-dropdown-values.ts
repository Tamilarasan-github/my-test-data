export class TestDataMetaDropdownValues
{
    constructor(
        public testDataMetaId?:number[],
        public testTables?:string[],
        public testCaseId?:string[],
        public jiraId?:string[],
        public runFlag?:string[],
        public testScriptName?:string[],
        public testShortDescription?:string[],
        public testPriority?:string[],
        public testCategory?:string[],
        public createdBy?:string[],
        public testDataCreatedFromDate?: Date,
        public testDataCreatedToDate?: Date,
        public updatedBy?:string[],
        public testDataUpdatedFromDate?: Date,
        public testDataUpdatedToDate?: Date
    )
    {
        // if(testDataMetaId==undefined)
        // {
        //     testDataMetaId=[]
        // }

        // if(testCaseId==undefined)
        // {
        //     testCaseId=[]
        // }

        // if(jiraId==undefined)
        // {
        //     jiraId=[]
        // }

        // if(runFlag==undefined)
        // {
        //     runFlag=[]
        // }

        // if(testScriptName==undefined)
        // {
        //     testScriptName=[]
        // }

        // if(testShortDescription==undefined)
        // {
        //     testShortDescription=[]
        // }

        // if(testPriority==undefined)
        // {
        //     testPriority=[]
        // }

        // if(testCategory==undefined)
        // {
        //     testCategory=[]
        // }

        // if(createdBy==undefined)
        // {
        //     createdBy=[]
        // }

        // if(testDataCreatedFromDate==undefined)
        // {
        //     testDataCreatedFromDate=new Date();
        // }

        // if(testDataCreatedToDate==undefined)
        // {
        //     testDataCreatedToDate=new Date();
        // }

        // if(updatedBy==undefined)
        // {
        //     updatedBy=[]
        // }

        // if(testDataUpdatedFromDate==undefined)
        // {
        //     testDataUpdatedFromDate=new Date();
        // }

        // if(testDataUpdatedToDate==undefined)
        // {
        //     testDataUpdatedToDate=new Date();
        // }
    }
}