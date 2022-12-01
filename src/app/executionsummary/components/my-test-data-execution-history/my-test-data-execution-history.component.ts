import { Component, Input, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TestExecutionSummaryService } from '../my-test-execution-summary/my-test-execution-summary-service';

import { TestDataMetaExecutionHistory } from './my-test-data-meta-execution-history';
import { TestDataMetaExecutionSearch } from './my-test-data-meta-execution-search.model';


@Component({
  selector: 'app-my-test-execution-results',
  templateUrl: './my-test-data-execution-history.component.html',
  styleUrls: ['./my-test-data-execution-history.component.css']
})
export class MyTestExecutionResultsComponent implements OnInit {
 

  testDataMetaExecutionHistoryList: TestDataMetaExecutionHistory[];

  

  @Input()
  listOfTestExecutionResultsReceived: TestDataMetaExecutionHistory[] = [];

  @Input()
  dataCollectionSize:number=0;
 
  showTestDataExecTable:boolean=true;
  selectColumnsDropdownSettings: IDropdownSettings = {};

  showSearch:boolean=false;

  searchDropdownSettings:IDropdownSettings={};

  currentlyInEditTestDataMetaExecutionHistory={} as TestDataMetaExecutionHistory;

  testDataExecutionId:string;
  suiteId: string;
  testScriptExecutionId:string;
  testDataMetaId: string;
  testScript:string;
  testShortDescription: string;
  jiraStory: string;

  // testExecutionIdDropdownList:any[]= [];
  // testExecutionIdSelectedList:any=[];

  // testDataIdDropdownList:any[]= [];
  // testDataIdSelectedList:any=[];

  // testScriptDropdownList:any[]= [];
  // testScriptSelectedList:any=[];

  // testDataDescriptionDropdownList:any[]= [];
  // testDataDescriptionSelectedList:any=[];

  testDataCategoryDropdownList:any[]= [];
  testDataCategorySelectedList:any=[];

  testDataStatusDropdownList:any[]= [];
  testDataStatusSelectedList:any=[];

  // jiraStoryDropdownList:any[]= [];
  // jiraStorySelectedList:any=[];

  testDataExecutedByDropdownList:any[]= [];
  testDataExecutedBySelectedList:any=[];

  testDataMetaExecCreatedDateFrom:Date;
  testDataMetaExecCreatedDateTo:Date;

 // listOfTestExecutionResults:TestExecutionResults[]=[]
  editableTestExecutionResults: TestDataMetaExecutionHistory| undefined;
  testExecutionResultsDetailsUpdate:Map<String,Map<String,String>>=new Map<String, Map<String,String>>();
  listOfTestExecutionResultsSelected:TestDataMetaExecutionHistory[]=[];

  columnsDropdownList: string[] = [];
  filteredColumnsDropdownList: string[] = [];
  columnsSelectedList: string[] = [];

  enableColumnDropdown: boolean = false;
  enableExportDropdown: boolean = false;

  columnMap:Map<string, string>=new Map<string, string>();
  fieldNameList: string[]=[];
  listOfTestExecutionDataReceived:TestDataMetaExecutionHistory[]=[];

  
  numOfRecordsToShowInAPage: number;
  totalNumOfRecords: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;

  constructor(private testExecutionSummaryService:TestExecutionSummaryService) 
  { 
    this.testDataMetaExecutionHistoryList=[];

    //this.currentlyInEditTestDataMetaExecutionHistory=;
    // const testExecutionSearchDropdownValues:TestExecutionSummarySearchCriteria=this.testExecutionSummaryService.getTestExecutionSummaryDropdownValues();
   
    this.searchDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 0,
      allowSearchFilter: true,
      clearSearchFilter: true,
    };

    this.testDataExecutionId='';
    this.suiteId='';
    this.testScriptExecutionId='';
    this.testDataMetaId='';
    this.testScript='';
    this.testShortDescription='';
    this.jiraStory='';
    this.testDataMetaExecCreatedDateFrom = new Date(2010,1,1);
    this.testDataMetaExecCreatedDateTo = new Date(2099,1,1);

    // this.testExecutionIdDropdownList = testExecutionSearchDropdownValues.testExecutionId;

    // this.testDataIdDropdownList = testExecutionSearchDropdownValues.testDataId;

    // this.testScriptDropdownList = testExecutionSearchDropdownValues.testScripts;

    // this.testDataDescriptionDropdownList = testExecutionSearchDropdownValues.testShortDescription;

    // this.testDataCategoryDropdownList = testExecutionSearchDropdownValues.testCategory;

    // this.testDataStatusDropdownList = testExecutionSearchDropdownValues.testDataStatus;

    // this.jiraStoryDropdownList = testExecutionSearchDropdownValues.jiraStory;

    // this.testDataExecutedByDropdownList = testExecutionSearchDropdownValues.executedBy;

    this.numOfRecordsToShowInAPage = 10;
    this.totalNumOfRecords = 0;
    this.currentPage = 0;
    this.totalPages = 0;
    this.hasNextPage = false;
    this.hasPreviousPage = false;

    this.testExecutionSummaryService.testDataMetaExecutionNumOfElementsAsObservable.subscribe({
      next: (value) => {
        this.totalNumOfRecords = value;
        console.log('totalNumOfRecords:' + this.totalNumOfRecords);
      },
    });

    this.testExecutionSummaryService.testDataMetaExecutionTotalPagesAsObservable.subscribe({
      next: (value) => {
        this.totalPages = value;
        console.log('totalPages:' + this.totalPages);
      },
    });

    this.testExecutionSummaryService.testDataMetaExecutionHasNextAsObservable.subscribe({
      next: (value) => {
        this.hasNextPage = value;
        console.log('hasNextPage:' + this.hasNextPage);
      },
    });

    this.testExecutionSummaryService.testDataMetaExecutionHasPreviousAsObservable.subscribe({
      next: (value) => {
        this.hasPreviousPage = value;
        console.log('hasPreviousPage:' + this.hasPreviousPage);
      },
    });

    this.testExecutionSummaryService.testDataMetaExecutionCurrentPageAsObservable.subscribe({
      next: (value) => {
        this.currentPage = value;
        console.log('currentPage:' + this.currentPage);
      },
    });

    this.testExecutionSummaryService.testDataMetaExecutionHistoryAsObservable.subscribe(
      {
        next:(value)=>this.testDataMetaExecutionHistoryList=value
      }
    )
  }
  ngOnInit(): void {
  }

  

  onItemSelect(event:any)
  {

  }

  onSelectAll(event:any)
  {

  }

  showSeachContainer()
  {
    this.showSearch=!this.showSearch;
  }

  fetchTestExecutionResults()
  {
    const testDataMetaExecutionSearch:TestDataMetaExecutionSearch=
    {
      'testDataExecutionId':this.setZeroIfEmptyString(this.testDataExecutionId),
      'suiteId': this.setZeroIfEmptyString(this.suiteId),
      'testScriptExecutionId':this.setZeroIfEmptyString(this.testScriptExecutionId),
      'testDataMetaId':this.setZeroIfEmptyString(this.testDataExecutionId),
      'testDataStatus':this.testDataStatusSelectedList,
      'testCategory':this.testDataCategorySelectedList,
      'jiraStory':this.jiraStory,
      'testScripts':this.testScript,
      'testShortDescription':this.testShortDescription,
      'executedBy':this.testDataExecutedBySelectedList,
      'executedDateFrom':this.testDataMetaExecCreatedDateFrom,
      'executedDateTo': this.testDataMetaExecCreatedDateTo
    }

    console.log("testDataMetaExecutionSearch:"+testDataMetaExecutionSearch);

    this.testExecutionSummaryService.fetchTestDataMetaExecutionHistoryBySearchCriteria(testDataMetaExecutionSearch, 0, 10, 'executedOn');

  }

  clearSearch()
  {

    this.testDataExecutionId='';
    this.suiteId='';
    this.testScriptExecutionId='';
    this.testDataExecutionId='';
    this.testScript='';
    this.testShortDescription='';
    this.jiraStory='';
    this.testDataMetaExecCreatedDateFrom = new Date(2010,1,1);
    this.testDataMetaExecCreatedDateTo = new Date(2099,1,1);
  }

  showTestDataExecTableContainer()
  {
    this.showTestDataExecTable=!this.showTestDataExecTable;
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

  getTestDataMetaExecutionHistoryPage() {

    const testDataMetaExecutionSearch:TestDataMetaExecutionSearch=
    {
      'testDataExecutionId':this.setZeroIfEmptyString(this.testDataExecutionId),
      'suiteId': this.setZeroIfEmptyString(this.suiteId),
      'testScriptExecutionId':this.setZeroIfEmptyString(this.testScriptExecutionId),
      'testDataMetaId':this.setZeroIfEmptyString(this.testDataExecutionId),
      'testDataStatus':this.testDataStatusSelectedList,
      'testCategory':this.testDataCategorySelectedList,
      'jiraStory':this.jiraStory,
      'testScripts':this.testScript,
      'testShortDescription':this.testShortDescription,
      'executedBy':this.testDataExecutedBySelectedList,
      'executedDateFrom':this.testDataMetaExecCreatedDateFrom,
      'executedDateTo': this.testDataMetaExecCreatedDateTo
    }

    this.testExecutionSummaryService.fetchTestDataMetaExecutionHistoryBySearchCriteria(testDataMetaExecutionSearch, this.currentPage + 1, 10, 'executedOn');
  }

  fetchPreviousPageTestDataMetaExecutionHistory() {
    if(this.hasPreviousPage)
    {
      const testDataMetaExecutionSearch:TestDataMetaExecutionSearch=
    {
      'testDataExecutionId':this.setZeroIfEmptyString(this.testDataExecutionId),
      'suiteId': this.setZeroIfEmptyString(this.suiteId),
      'testScriptExecutionId':this.setZeroIfEmptyString(this.testScriptExecutionId),
      'testDataMetaId':this.setZeroIfEmptyString(this.testDataExecutionId),
      'testDataStatus':this.testDataStatusSelectedList,
      'testCategory':this.testDataCategorySelectedList,
      'jiraStory':this.jiraStory,
      'testScripts':this.testScript,
      'testShortDescription':this.testShortDescription,
      'executedBy':this.testDataExecutedBySelectedList,
      'executedDateFrom':this.testDataMetaExecCreatedDateFrom,
      'executedDateTo': this.testDataMetaExecCreatedDateTo
    }

      
      this.testExecutionSummaryService.fetchTestDataMetaExecutionHistoryBySearchCriteria(testDataMetaExecutionSearch, this.currentPage - 2, 10, 'executedOn');
  
    }
  }

  fetchNextPageTestDataMetaExecutionHistory() {
    console.log('Current Page:' + this.currentPage);
    
    if(this.hasNextPage)
    {
      const testDataMetaExecutionSearch:TestDataMetaExecutionSearch=
    {
      'testDataExecutionId':this.setZeroIfEmptyString(this.testDataExecutionId),
      'suiteId': this.setZeroIfEmptyString(this.suiteId),
      'testScriptExecutionId':this.setZeroIfEmptyString(this.testScriptExecutionId),
      'testDataMetaId':this.setZeroIfEmptyString(this.testDataExecutionId),
      'testDataStatus':this.testDataStatusSelectedList,
      'testCategory':this.testDataCategorySelectedList,
      'jiraStory':this.jiraStory,
      'testScripts':this.testScript,
      'testShortDescription':this.testShortDescription,
      'executedBy':this.testDataExecutedBySelectedList,
      'executedDateFrom':this.testDataMetaExecCreatedDateFrom,
      'executedDateTo': this.testDataMetaExecCreatedDateTo
    }

      this.testExecutionSummaryService.fetchTestDataMetaExecutionHistoryBySearchCriteria(testDataMetaExecutionSearch, this.currentPage , 10, 'executedOn');
    }
  }

  onEdit( event: any, testDataMetaExecutionHistory: TestDataMetaExecutionHistory) 
  {
    console.log('onEdit is triggered..!!');
    if (this.currentlyInEditTestDataMetaExecutionHistory == undefined)
     {
      this.currentlyInEditTestDataMetaExecutionHistory = testDataMetaExecutionHistory;
     } 
     else if ( this.currentlyInEditTestDataMetaExecutionHistory.testDataExecutionId !=testDataMetaExecutionHistory.testDataExecutionId) 
     {
      if (confirm('There are some unsaved changes, do you want to save them before proceeding?')) 
      {
      // //   this.testExecutionSummaryService.updateTestData(this.testApplicationId, this.testDataUpdate
      // //   ).subscribe({
      // //     next: (responseBody) => {
      // //       console.log('Update response: ' + JSON.stringify(responseBody));
      // //       this.testDataService.fetchTestDataMetaFromBackend(this.applicationTableInfoService.applicationSelected, this.selectedTestTableId, this.testDataService.lastUsedTestDataSearchCriteria!, 0, 10, 'testDataExecutionId');
      // //       this.testDataService.fetchDropdownValuesFromBackEnd(this.applicationTableInfoService.applicationSelected,  this.selectedTestTableId);
      // //       this.testDataUpdate=[];
      // //       this.currentlyInEditTestDataMetaExecutionHistory=undefined;
      // //       alert("Successfully updated");
      // //     },
      // //     error: (e) => {
      // //       console.log('Update response: ' + JSON.stringify(e));
      // //       alert('Update error:' + JSON.stringify(e));
      // //     },
      // //     complete: () => console.info('Updated successfully & dropdown updated'),
      // //   });
      }
      this.currentlyInEditTestDataMetaExecutionHistory = testDataMetaExecutionHistory;
      
    }
  }

  onCancel(
    event: any,
    testDataMetaExecutionHistory: TestDataMetaExecutionHistory,
  ) {
    if (this.currentlyInEditTestDataMetaExecutionHistory === testDataMetaExecutionHistory) 
    {
      if (confirm('Are you sure do you want to cancel the changes made for this record?')) 
      {
        this.currentlyInEditTestDataMetaExecutionHistory = undefined!;
      }
    }

  }

  onUpdate(
    event: any,
    testDataMetaExecutionHistory: TestDataMetaExecutionHistory) {
    if (
      this.currentlyInEditTestDataMetaExecutionHistory &&
      this.currentlyInEditTestDataMetaExecutionHistory.testDataExecutionId ===
      testDataMetaExecutionHistory.testDataExecutionId
      ) 
      {
    //   this.testExecutionSummaryService.updateTestData(
    //   this.testApplicationId,
    //   this.testDataUpdate
    //    ).subscribe({
    //   next: (responseBody) => {
    //     console.log('Update response: ' + JSON.stringify(responseBody));
    //     this.testDataService.fetchTestDataMetaFromBackend(this.applicationTableInfoService.applicationSelected, this.selectedTestTableId, this.testDataService.lastUsedTestDataSearchCriteria!, 0, 10, 'testDataExecutionId');
    //     this.testDataService.fetchDropdownValuesFromBackEnd(this.applicationTableInfoService.applicationSelected,  this.selectedTestTableId);
    //     this.testDataUpdate=[];
    //     this.currentlyInEditTestDataMetaExecutionHistory=undefined;
    //     alert("Successfully updated");
    //   },
    //   error: (e) => {
    //     console.log('Update response: ' + JSON.stringify(e));
    //     alert('Update error:' + JSON.stringify(e));
    //   },
    //   complete: () => console.info('Updated successfully & dropdown updated'),
    // });
     }
  }


}
