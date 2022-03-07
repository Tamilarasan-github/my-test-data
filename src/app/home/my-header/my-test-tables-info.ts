export class TestTableInfo
{
    constructor(
        public tableId:number,
        public tableName:string,
        public applicationId:number,
        public description:string,
        public createdBy:string,
        public createdDate:Date,
        public updatedBy:string,
        public updatedDate:Date,
        public deleteFlag:string)
    {

    }
}