import { TestTableInfo } from "./my-test-tables-info";

export class TestApplicationInfo
{
    constructor(
        public applicationId:number,
        public applicationName:string,
        public description:string,
        public createdBy:string,
        public createdDate:Date,
        public updatedBy:string,
        public updatedDate:Date,
        public deleteFlag:string,
        public testTablesInfo: TestTableInfo[])
    {

    }
}