export class TestDataMetaExecutionSearchDropdownValues {
    
        constructor(
            public testExecutionId:string[],
            public testDataId:string[],
            public testDataStatus:string[],
            public testCategory:string[],
            public jiraStory:string[],
            public testScripts:string[],
            public testShortDescription:string[],
            public executedBy:string[]
        )
        {}
}
