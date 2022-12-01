export class TestDataFilter
{
   constructor(
    public runFlag: string[], 
    public testCategory: string[], 
    public testPriority: number[],
    public createdBy: string[],
	public createdDateFrom : Date,
    public createdDateTo : Date)
    {}
}