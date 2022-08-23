import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TestExecutionSummaryService } from '../my-test-execution-summary-service';
import { TestSuiteExecutionHistory } from './suite';

@Component({
  selector: 'app-my-suite-execution-history',
  templateUrl: './my-suite-execution-history.component.html',
  styleUrls: ['./my-suite-execution-history.component.css']
})
export class MySuiteExecutionHistoryComponent implements OnInit {

  showSuiteSearch: boolean=false;
  showSuiteTable: boolean=true;
  testSuiteExecutionHistory:TestSuiteExecutionHistory[];
  searchDropdownSettings: IDropdownSettings = {};
  suiteStatusSelected: string[]=[];
  suiteStatusList: string[]=[];
  suiteCreatedDateFrom: Date= new Date();
  suiteCreatedDateTo: Date= new Date();


  constructor(private _router: Router, private testExecutionSummaryService:TestExecutionSummaryService) {

    this.testSuiteExecutionHistory=[];

    this.testExecutionSummaryService.testSuiteExecutionHistoryAsObservable.subscribe(
      {
        next:(value)=> this.testSuiteExecutionHistory=value
      }
    )
   }

  ngOnInit(): void {
    this.showSuiteSearch=false;
    this.showSuiteTable=true;
    this.suiteStatusList=['Added','Queued','Completed','Error','Canceled'];
    this.searchDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      clearSearchFilter: true,
    };

  }

  showSuiteSearchContainer()
  {
    this.showSuiteSearch=!this.showSuiteSearch;
  }

  showSuiteTableContainer()
  {
    this.showSuiteTable=!this.showSuiteTable;
  }

  fetchSuiteExecutionDetails()
  {

  }

  clearSuiteSearch()
  {

  }

  getTestSCriptsExecutionHistory(suiteId: string)
  {
    this.testExecutionSummaryService.getTestScriptsExecutionHistory(suiteId);
  }

  executeSuite(suiteId: string)
  {
    this.testExecutionSummaryService.executeSuite(suiteId);
  }

  cancelSuiteExecution(suiteId: string)
  {
    this.testExecutionSummaryService.cancelSuiteExecution(suiteId);
  }

  viewReport(suiteId: string)
  {
    const url = this._router.serializeUrl(
      this._router.createUrlTree(['/test-reports/'+suiteId]));
      console.log("URL:"+url);
       window.open("http://localhost:8080/applications/1001/execution-summary/testSuite/view-report/"+suiteId, '_blank');
  }

}
