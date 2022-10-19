import { TestDataAppOneTableOne } from "./my-test-data-app-one-table-one";

export class TestDataMeta {
        public testDataMetaId: number;
        public testTableId: number;
        public testCaseId: string;
        public testShortDescription: string;
        public testScenario: string;
        public runFlag: string;
        public testPriority: number;
        public testCategory: string;
        public testScriptName: string;
        public jiraId: string;
        public testExecutionTime: string;
        public createdBy: string;
        public createdDate: string;
        public updatedBy: string;
        public updatedDate: string;
        public deleteFlag: string;
        public testDataAppOneTableOne: TestDataAppOneTableOne[];
        public testDataAppOneTableTwo: TestDataAppOneTableOne[];

    constructor() 
    {
        this.testDataMetaId=0;
        this.testTableId=0;
        this.testCaseId="";
        this.testShortDescription="";
        this.testScenario="";
        this.runFlag="";
        this.testPriority=0;
        this.testCategory="";
        this.testScriptName="";
        this.jiraId="";
        this.testExecutionTime="";
        this.createdBy="";
        this.createdDate="";
        this.updatedBy="";
        this.updatedDate="";
        this.deleteFlag="";
        this.testDataAppOneTableOne=[];
        this.testDataAppOneTableTwo=[];
    }


}