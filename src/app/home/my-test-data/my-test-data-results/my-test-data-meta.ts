import { TestData } from "./my-test-data";

export class TestDataMeta {
    constructor(
        public testDataMetaId: number,
        public testCaseId: string,
        public testShortDescription: string,
        public testScenario: string,
        public runFlag: string,
        public testPriority: number,
        public testCategory: string,
        public testScriptName: string,
        public jiraId: string,
        public testExecutionTime: string,
        public createdBy: string,
        public createdDate: string,
        public updatedBy: string,
        public updatedDate: string,
        public deleteFlag: string,
        public testDataApp: TestData[]
    ) 
    {

    }
}