export class TestDataSearchCriteria
{
    constructor(
        public testDataId:string[],
        public testCategory:string[],
        public jiraStory:string[],
        public runFlag:string[],
        public testScripts:string[],
        public testShortDescription:string[],
        public createdBy:string[],
        public updatedBy:string[]
    )
    {}
}