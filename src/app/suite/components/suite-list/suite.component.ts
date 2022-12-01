import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TestExecutionSummaryService } from 'src/app/executionsummary/components/my-test-execution-summary/my-test-execution-summary-service';
import { SuiteService } from '../../suite-service';
import { Suite } from '../../suite.model';
import { SuiteSearch } from './suite-search.model';

@Component({
  selector: 'app-suite',
  templateUrl: './suite.component.html',
  styleUrls: ['./suite.component.css']
})
export class SuiteComponent implements OnInit {
  showSuiteSearch: boolean=true;
  suiteExecutionResultsVisible: boolean=true;
  testSuiteList:Suite[];
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


  constructor(private _router: Router, private suiteService:SuiteService, private testExecutionSummaryService:TestExecutionSummaryService) {

    this.suiteId='';
    this.suiteName='';
    this.suiteUrl='';
    this.suiteCreatedDateFrom = new Date(2010,1,1);
    this.suiteCreatedDateTo = new Date(2099,1,1);
    this.testSuiteList=[];
    
    this.numOfRecordsToShowInAPage = 10;
    this.totalNumOfRecords = 0;
    this.currentPage = 0;
    this.totalPages = 0;
    this.hasNextPage = false;
    this.hasPreviousPage = false;

    this.suiteService.testSuiteListNumOfElementsAsObservable.subscribe({
      next: (value) => {
        this.totalNumOfRecords = value;
        console.log('totalNumOfRecords:' + this.totalNumOfRecords);
      },
    });

    this.suiteService.testSuiteListTotalPagesAsObservable.subscribe({
      next: (value) => {
        this.totalPages = value;
        console.log('totalPages:' + this.totalPages);
      },
    });

    this.suiteService.testSuiteListHasNextAsObservable.subscribe({
      next: (value) => {
        this.hasNextPage = value;
        console.log('hasNextPage:' + this.hasNextPage);
      },
    });

    this.suiteService.testSuiteListHasPreviousAsObservable.subscribe({
      next: (value) => {
        this.hasPreviousPage = value;
        console.log('hasPreviousPage:' + this.hasPreviousPage);
      },
    });

    this.suiteService.testSuiteListCurrentPageAsObservable.subscribe({
      next: (value) => {
        this.currentPage = value;
        console.log('currentPage:' + this.currentPage);
      },
    });

    this.suiteService.testSuiteListAsObservable.subscribe(
      {
        next:(value)=> this.testSuiteList=value
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
    const suiteSearch:SuiteSearch=new SuiteSearch(this.suiteId, this.suiteName, this.createdBySelected, this.suiteCreatedDateFrom, this.suiteCreatedDateTo);
    this.suiteService.fetchTestSuiteListBySearchCriteria(suiteSearch, 0, 10, 'createdDate');
  }

  clearSuiteSearch()
  {
    this.suiteId='';
    this.suiteName='';
    this.suiteCreatedDateFrom= new Date('2000-01-01'); 
    this.suiteCreatedDateTo= new Date('2999-01-01'); 
  }

  // getTestSCriptsExecution(suiteId: string)
  // {
  //   this.suiteService.getTestScriptsExecutionHistory(suiteId);
  // }

  executeSuite(suiteId: number)
  {
    this.testExecutionSummaryService.executeSuite(suiteId);
  }

  viewTestScripts(suiteId: number)
  {
    this.suiteService.fetchTestScriptsBySuiteId(suiteId);
  }

  cancelSuiteExecution(suiteId: string)
  {
    //this.suiteService.cancelSuiteExecution(suiteId);
  }

  
  getTestSuitePage() {
    this.getInputElementSearchValuesFromHTML();
    const suiteSearch:SuiteSearch=new SuiteSearch(this.suiteId, this.suiteName, this.createdBySelected, this.suiteCreatedDateFrom, this.suiteCreatedDateTo);
    this.suiteService.fetchTestSuiteListBySearchCriteria(suiteSearch, this.currentPage+1, 10, 'createdDate'
    );
  }

  fetchPreviousPageTestSuite() {
    if(this.hasPreviousPage)
    {
      const suiteSearch:SuiteSearch=new SuiteSearch(this.suiteId, this.suiteName, this.createdBySelected, this.suiteCreatedDateFrom, this.suiteCreatedDateTo);

      this.suiteService.fetchTestSuiteListBySearchCriteria(
      suiteSearch,
      this.currentPage - 2,
      10, 
      'createdDate'
      );
    }
  }

  fetchNextPageTestSuite() {
    console.log('Current Page:' + this.currentPage);
    
    if(this.hasNextPage)
    {
      this.getInputElementSearchValuesFromHTML();
      const suiteSearch:SuiteSearch=new SuiteSearch(this.suiteId, this.suiteName, this.createdBySelected, this.suiteCreatedDateFrom, this.suiteCreatedDateTo);

      this.suiteService.fetchTestSuiteListBySearchCriteria(
      suiteSearch,
      this.currentPage,
      10, 
      'createdDate'
      );
    }
  }

  getInputElementSearchValuesFromHTML()
  {
    const suiteId=document.getElementById('suiteId') as HTMLInputElement;
    this.suiteId=suiteId.value;

    const suiteName=document.getElementById('suiteName') as HTMLInputElement;
    this.suiteName=suiteName.value;

    const suiteCreatedDateFrom=document.getElementById('suiteCreatedDateFrom') as HTMLInputElement;
    this.suiteCreatedDateFrom=new Date(suiteCreatedDateFrom.value);

  }

}
