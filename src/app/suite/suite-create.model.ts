import { TestScript } from "../testscripts/test-scripts";
import { Suite } from "./suite.model";

export class SuiteCreateModel{
    constructor(
        public suiteInfo: Suite,
        public testScripts: TestScript[])
    {}
}