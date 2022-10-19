import { Component, OnInit } from '@angular/core';
import { TestExecutionSummaryService } from 'src/app/executionsummary/components/my-test-execution-summary/my-test-execution-summary-service';

import { TestScriptsExecutionHistory } from './test-scripts-execution-history';

@Component({
  selector: 'app-my-test-scripts-execution-history',
  templateUrl: './my-test-scripts-execution-history.component.html',
  styleUrls: ['./my-test-scripts-execution-history.component.css']
})
export class MyTestScriptsExecutionHistoryComponent implements OnInit {

  showTestScriptsExecTable: boolean=true;
  testScriptsExecutionHistory:TestScriptsExecutionHistory[];

  constructor(private testExecutionSummaryService:TestExecutionSummaryService) {

    this.testScriptsExecutionHistory=[];

    this.testExecutionSummaryService.testScriptsExecutionHistoryAsObservable.subscribe(
      {
        next:(value)=> this.testScriptsExecutionHistory=value
      }
    )
   }

  ngOnInit(): void {
  }

  showTestScriptsExecTableContainer()
  {
    this.showTestScriptsExecTable=!this.showTestScriptsExecTable;
  }

  fetchTestScriptsExecutionDetails()
  {

  }

  getTestDataMetaExecutionHistory(testScriptExecutionId: string)
  {
    this.testExecutionSummaryService.getTestDataMetaExecutionHistory(testScriptExecutionId);
  }

}
