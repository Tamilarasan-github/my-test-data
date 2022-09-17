import { TestScript } from "./test-scripts";

export class NewGroup
{
    constructor(
        public groupName:string,
        public testScriptData: TestScript[]
    )
    {
        
    }
}