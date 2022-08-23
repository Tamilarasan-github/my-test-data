import { TestScript } from "./test-scripts";

export class TestScriptExecution {

    constructor(
        public suiteName:String, 
        public url:String,
        public browser:String,
        public userName:String,
        public password:String,
        public testScripts: TestScript[]
        )
    {

    }
}
