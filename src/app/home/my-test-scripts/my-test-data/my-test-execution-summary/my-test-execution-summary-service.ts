import { Injectable } from "@angular/core";

import { TestExecutionSummarySearchCriteria } from "./my-test-execution-search/my-test-execution-summary-search-criteria";

@Injectable()
export class MyTestExecutionSummaryService
{

    getTestExecutionSummaryDropdownValues():TestExecutionSummarySearchCriteria
    {
        const response=
            new TestExecutionSummarySearchCriteria(['1001', '1002'],
                ['T001', 'T002'],
                ['PASS', 'FAIL', 'No Results'],
                ['Smoke Test', 'Regression'],
                ['JIRA-01', 'JIRA-21'],
                ['TestScript-001', 'TestScript-002'],
                ['Hello', 'World'],
                ['Tamilarasan S']);
        

        return response;
    }
}