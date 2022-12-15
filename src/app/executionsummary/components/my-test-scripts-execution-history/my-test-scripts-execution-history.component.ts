import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TestExecutionSummaryService } from 'src/app/executionsummary/components/my-test-execution-summary/my-test-execution-summary-service';
import { TestDataMetaExecutionSearch } from '../my-test-data-execution-history/my-test-data-meta-execution-search.model';

import { TestScriptsExecutionHistory } from './test-scripts-execution-history';
import { TestScriptsExecutionSearch } from './testscripts-execution-search.model';

@Component({
  selector: 'app-my-test-scripts-execution-history',
  templateUrl: './my-test-scripts-execution-history.component.html',
  styleUrls: ['./my-test-scripts-execution-history.component.css']
})
export class MyTestScriptsExecutionHistoryComponent implements OnInit {

  showTestScriptsExecTable: boolean=true;
  testScriptsExecutionHistory:TestScriptsExecutionHistory[];

  testScriptsExecutionId: string;
  suiteExecutionId: string;
  suiteId: string;
  testScriptId: string;
  testScriptsCategory: string[];

  searchDropdownSettings: IDropdownSettings = {};
  createdByList: string[];
  createdBySelected: string[];
  testScriptExecCreatedDateFrom:Date;
  testScriptExecCreatedDateTo:Date;

  numOfRecordsToShowInAPage: number;
  totalNumOfRecords: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  

  constructor(private testExecutionSummaryService:TestExecutionSummaryService) {

    this.testScriptsExecutionHistory=[];
    this.testScriptsExecutionId="";

    this.suiteExecutionId="";
    this.suiteId="";
    this.testScriptId="";
    this.testScriptsCategory=[];

    this.createdByList=[];
    this.createdBySelected=[];
    this.testScriptExecCreatedDateFrom=new Date('2000-01-01'); 
    this.testScriptExecCreatedDateTo=new Date('2099-01-01'); 

    this.numOfRecordsToShowInAPage = 10;
    this.totalNumOfRecords = 0;
    this.currentPage = 0;
    this.totalPages = 0;
    this.hasNextPage = false;
    this.hasPreviousPage = false;

    this.testExecutionSummaryService.testScriptExecutionNumOfElementsAsObservable.subscribe({
      next: (value) => {
        this.totalNumOfRecords = value;
        console.log('totalNumOfRecords:' + this.totalNumOfRecords);
      },
    });

    this.testExecutionSummaryService.testScriptExecutionTotalPagesAsObservable.subscribe({
      next: (value) => {
        this.totalPages = value;
        console.log('totalPages:' + this.totalPages);
      },
    });

    this.testExecutionSummaryService.testScriptExecutionHasNextAsObservable.subscribe({
      next: (value) => {
        this.hasNextPage = value;
        console.log('hasNextPage:' + this.hasNextPage);
      },
    });

    this.testExecutionSummaryService.testScriptExecutionHasPreviousAsObservable.subscribe({
      next: (value) => {
        this.hasPreviousPage = value;
        console.log('hasPreviousPage:' + this.hasPreviousPage);
      },
    });

    this.testExecutionSummaryService.testScriptExecutionCurrentPageAsObservable.subscribe({
      next: (value) => {
        this.currentPage = value;
        console.log('currentPage:' + this.currentPage);
      },
    });

    this.testExecutionSummaryService.testScriptsExecutionHistoryAsObservable.subscribe(
      {
        next:(value)=> this.testScriptsExecutionHistory=value
      }
    )
   }

  ngOnInit(): void {
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

  showTestScriptsExecTableContainer()
  {
    this.showTestScriptsExecTable=!this.showTestScriptsExecTable;
  }

  fetchTestScriptsExecutionDetails()
  {
    let testScriptsExecutionSearch:TestScriptsExecutionSearch=new TestScriptsExecutionSearch(this.testScriptsExecutionId, this.suiteId, this.testScriptId, this.testScriptsCategory, this.createdByList, this.testScriptExecCreatedDateFrom, this.testScriptExecCreatedDateTo);
    this.testExecutionSummaryService.fetchTestScriptExecutionHistoryBySearchCriteria(testScriptsExecutionSearch, 0, 10, 'suiteId');
  }

  clearTestScriptsSearch()
  {
    this.testScriptsExecutionId="";
    this.suiteId="";
    this.testScriptId="";
    this.testScriptsCategory=[];

    this.createdByList=[];
    this.createdBySelected=[];
    this.testScriptExecCreatedDateFrom=new Date('2000-01-01'); 
    this.testScriptExecCreatedDateTo=new Date('2099-01-01'); 
  }

  setZeroIfEmptyString(input: string)
  {
    if(input==="")
    {
      return "0";
    }
    else
    {
      return input;
    }
  }

  getTestDataMetaExecutionHistory(testScriptExecutionId: string)
  {
    const testDataMetaExecutionSearch:TestDataMetaExecutionSearch=
    {
      'testDataExecutionId':"0",
      'suiteId': "0",
      'testScriptExecutionId':testScriptExecutionId,
      'testDataMetaId':"0",
      'testDataStatus':[],
      'testCategory':[],
      'jiraStory':"",
      'testScripts':"",
      'testShortDescription':"",
      'executedBy':[],
      'executedDateFrom':new Date('2000-01-01'),
      'executedDateTo':new Date('2099-01-01') 
    }

    console.log("testDataMetaExecutionSearch:"+testDataMetaExecutionSearch);

    this.testExecutionSummaryService.fetchTestDataMetaExecutionHistoryBySearchCriteria(testDataMetaExecutionSearch, 0, 10, 'executedOn');

  }

  getTestScriptsExecutionHistoryPage() {   
    let testScriptsExecutionSearch:TestScriptsExecutionSearch=new TestScriptsExecutionSearch(this.setZeroIfEmptyString(this.testScriptsExecutionId), this.setZeroIfEmptyString(this.suiteId), this.setZeroIfEmptyString(this.testScriptId), this.testScriptsCategory, this.createdByList, this.testScriptExecCreatedDateFrom, this.testScriptExecCreatedDateTo);
    this.testExecutionSummaryService.fetchTestScriptExecutionHistoryBySearchCriteria(testScriptsExecutionSearch, this.currentPage + 1, 10, 'createdDate');
  }

  fetchPreviousPageTestScriptsExecutionHistory() {
    if(this.hasPreviousPage)
    {
      let testScriptsExecutionSearch:TestScriptsExecutionSearch=new TestScriptsExecutionSearch(this.setZeroIfEmptyString(this.testScriptsExecutionId), this.setZeroIfEmptyString(this.suiteId),  this.setZeroIfEmptyString(this.testScriptId), this.testScriptsCategory, this.createdByList, this.testScriptExecCreatedDateFrom, this.testScriptExecCreatedDateTo);
      this.testExecutionSummaryService.fetchTestScriptExecutionHistoryBySearchCriteria(testScriptsExecutionSearch, this.currentPage - 2, 10, 'createdDate');
  
    }
  }

  fetchNextPageTestScriptsExecutionHistory() {
    console.log('Current Page:' + this.currentPage);
    
    if(this.hasNextPage)
    {
      let testScriptsExecutionSearch:TestScriptsExecutionSearch=new TestScriptsExecutionSearch(this.setZeroIfEmptyString(this.testScriptsExecutionId), this.setZeroIfEmptyString(this.suiteId),  this.setZeroIfEmptyString(this.testScriptId), this.testScriptsCategory, this.createdByList, this.testScriptExecCreatedDateFrom, this.testScriptExecCreatedDateTo);
      this.testExecutionSummaryService.fetchTestScriptExecutionHistoryBySearchCriteria(testScriptsExecutionSearch, this.currentPage , 10, 'createdDate');
    }
  }

}
