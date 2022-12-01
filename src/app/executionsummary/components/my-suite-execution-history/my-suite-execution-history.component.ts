import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TestExecutionSummaryService } from '../my-test-execution-summary/my-test-execution-summary-service';
import { SuiteExecutionSearch } from './suite-execution-search.model';
import { TestSuiteExecutionInfo } from './suite.model';

@Component({
  selector: 'app-my-suite-execution-history',
  templateUrl: './my-suite-execution-history.component.html',
  styleUrls: ['./my-suite-execution-history.component.css']
})
export class MySuiteExecutionHistoryComponent implements OnInit {

  showSuiteSearch: boolean=true;
  suiteExecutionResultsVisible: boolean=true;
  testSuiteExecutionHistory:TestSuiteExecutionInfo[];
  searchDropdownSettings: IDropdownSettings = {};
  suiteId: string;
  suiteName: string;
  suiteUrl: string;
  suiteStatusSelected: string[]=[];
  createdBySelected: string[]=[];
  suiteStatusList: string[]=[];
  createdByList: string[]=[];
  suiteCreatedDateFrom: Date; 
  suiteCreatedDateTo: Date; 

  numOfRecordsToShowInAPage: number;
  totalNumOfRecords: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;


  constructor(private _router: Router, private testExecutionSummaryService:TestExecutionSummaryService) {

    this.suiteId='';
    this.suiteName='';
    this.suiteUrl='';
    this.suiteCreatedDateFrom = new Date(2010,1,1);
    this.suiteCreatedDateTo = new Date(2099,1,1);
    this.testSuiteExecutionHistory=[];
    
    this.numOfRecordsToShowInAPage = 10;
    this.totalNumOfRecords = 0;
    this.currentPage = 0;
    this.totalPages = 0;
    this.hasNextPage = false;
    this.hasPreviousPage = false;

    this.testExecutionSummaryService.testSuiteExecutionNumOfElementsAsObservable.subscribe({
      next: (value) => {
        this.totalNumOfRecords = value;
        console.log('totalNumOfRecords:' + this.totalNumOfRecords);
      },
    });

    this.testExecutionSummaryService.testSuiteExecutionTotalPagesAsObservable.subscribe({
      next: (value) => {
        this.totalPages = value;
        console.log('totalPages:' + this.totalPages);
      },
    });

    this.testExecutionSummaryService.testSuiteExecutionHasNextAsObservable.subscribe({
      next: (value) => {
        this.hasNextPage = value;
        console.log('hasNextPage:' + this.hasNextPage);
      },
    });

    this.testExecutionSummaryService.testSuiteExecutionHasPreviousAsObservable.subscribe({
      next: (value) => {
        this.hasPreviousPage = value;
        console.log('hasPreviousPage:' + this.hasPreviousPage);
      },
    });

    this.testExecutionSummaryService.testSuiteExecutionCurrentPageAsObservable.subscribe({
      next: (value) => {
        this.currentPage = value;
        console.log('currentPage:' + this.currentPage);
      },
    });

    this.testExecutionSummaryService.testSuiteExecutionHistoryAsObservable.subscribe(
      {
        next:(value)=> this.testSuiteExecutionHistory=value
      }
    )
   }

  ngOnInit(): void {
    this.showSuiteSearch=false;
    this.suiteExecutionResultsVisible=true;
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
    this.suiteExecutionResultsVisible=!this.suiteExecutionResultsVisible;
  }

  fetchSuiteExecutionDetails()
  {
    const suiteExecutionSearch:SuiteExecutionSearch=new SuiteExecutionSearch(this.suiteId, this.suiteName, this.suiteStatusSelected, this.suiteUrl, this.createdBySelected, this.suiteCreatedDateFrom, this.suiteCreatedDateTo);
    this.testExecutionSummaryService.fetchTestSuiteExecutionHistoryBySearchCriteria(suiteExecutionSearch, 0, 10, 'createdDate');
  }

  clearSuiteSearch()
  {
    this.suiteId='';
    this.suiteName='';
    this.suiteUrl='';
    this.suiteStatusSelected=[];
    this.suiteCreatedDateFrom= new Date('2000-01-01'); 
    this.suiteCreatedDateTo= new Date('2999-01-01'); 
  }

  getTestScriptsExecutionHistory(suiteId: number)
  {
    this.testExecutionSummaryService.getTestScriptsExecutionHistory(suiteId);
  }

  executeSuite(suiteId: number)
  {
    this.testExecutionSummaryService.executeSuite(suiteId);
  }

  cancelSuiteExecution(suiteId: number)
  {
    this.testExecutionSummaryService.cancelSuiteExecution(suiteId);
  }

  viewReport(suiteId: number)
  {
    const url = this._router.serializeUrl(
      this._router.createUrlTree(['/test-reports/'+suiteId]));
      console.log("URL:"+url);
       window.open("http://localhost:8080/applications/1001/execution-summary/testSuite/view-report/"+suiteId, '_blank');
  }

  getTestSuiteExecutionHistoryPage() {
    const suiteExecutionSearch:SuiteExecutionSearch=new SuiteExecutionSearch(this.suiteId, this.suiteName, this.suiteStatusSelected, this.suiteUrl, this.createdBySelected, this.suiteCreatedDateFrom, this.suiteCreatedDateTo);
    this.testExecutionSummaryService.fetchTestSuiteExecutionHistoryBySearchCriteria(suiteExecutionSearch, this.currentPage+1, 10, 'createdDate'
    );
  }

  fetchPreviousPageTestSuiteExecutionHistory() {
    if(this.hasPreviousPage)
    {
      const suiteExecutionSearch:SuiteExecutionSearch=new SuiteExecutionSearch(this.suiteId, this.suiteName, this.suiteStatusSelected, this.suiteUrl, this.createdBySelected, this.suiteCreatedDateFrom, this.suiteCreatedDateTo);

      this.testExecutionSummaryService.fetchTestSuiteExecutionHistoryBySearchCriteria(
      suiteExecutionSearch,
      this.currentPage - 2,
      10, 
      'createdDate'
      );
    }
  }

  fetchNextPageTestSuiteExecutionHistory() {
    console.log('Current Page:' + this.currentPage);
    
    if(this.hasNextPage)
    {
      const suiteExecutionSearch:SuiteExecutionSearch=new SuiteExecutionSearch(this.suiteId, this.suiteName, this.suiteStatusSelected, this.suiteUrl, this.createdBySelected, this.suiteCreatedDateFrom, this.suiteCreatedDateTo);

      this.testExecutionSummaryService.fetchTestSuiteExecutionHistoryBySearchCriteria(
      suiteExecutionSearch,
      this.currentPage,
      10, 
      'createdDate'
      );
    }
  }

}
