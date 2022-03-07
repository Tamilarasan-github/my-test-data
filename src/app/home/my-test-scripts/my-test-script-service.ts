
import { Injectable } from "@angular/core";
import { TestScriptGroups } from "./my-test-script-groups";
import { TestScriptData } from "./test-script-data";

@Injectable()
export class TestScriptService {
    fetchTestScriptGroups(): TestScriptGroups {
        return { 'groupName': ['Smoke Test', 'Regression Test', 'Unit Test'] }
    }

    fetchTestScripts(): TestScriptData[] {
        return [
            new TestScriptData(1001, 'T001_Testscript', 'T001-This test script validates high-level flow'),
            new TestScriptData(1002, 'T002_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1003, 'T003_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1004, 'T004_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
            new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow')
        ]
    }

}