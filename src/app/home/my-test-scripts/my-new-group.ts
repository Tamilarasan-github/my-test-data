import { TestScriptData } from "./test-script-data";

export class NewGroup
{
    constructor(
        public groupName:string,
        public testScriptData: TestScriptData[]
    )
    {
        
    }
}