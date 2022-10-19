import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TestExecutionSummaryService } from '../my-test-execution-summary/my-test-execution-summary-service';
import { TestExecutionSummarySearchCriteria } from './my-test-execution-summary-search-criteria';

@Component({
  selector: 'app-my-test-execution-search',
  templateUrl: './my-test-execution-search.component.html',
  styleUrls: ['./my-test-execution-search.component.css']
})
export class MyTestExecutionSearchComponent implements OnInit {

  constructor(private testExecutionSummaryService:TestExecutionSummaryService) { }

  showSearch:boolean=false;

  searchDropdownSettings:IDropdownSettings={};

  testExecutionIdDropdownList:any[]= [];
  testExecutionIdSelectedList:any=[];

  testDataIdDropdownList:any[]= [];
  testDataIdSelectedList:any=[];

  testScriptDropdownList:any[]= [];
  testScriptSelectedList:any=[];

  testDataDescriptionDropdownList:any[]= [];
  testDataDescriptionSelectedList:any=[];

  testDataCategoryDropdownList:any[]= [];
  testDataCategorySelectedList:any=[];

  testDataStatusDropdownList:any[]= [];
  testDataStatusSelectedList:any=[];

  jiraStoryDropdownList:any[]= [];
  jiraStorySelectedList:any=[];

  testDataExecutedByDropdownList:any[]= [];
  testDataExecutedBySelectedList:any=[];

  
  ngOnInit(): void {
    const testExecutionSearchDropdownValues:TestExecutionSummarySearchCriteria=this.testExecutionSummaryService.getTestExecutionSummaryDropdownValues();
   
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

    this.testExecutionIdDropdownList = testExecutionSearchDropdownValues.testExecutionId;

    this.testDataIdDropdownList = testExecutionSearchDropdownValues.testDataId;

    this.testScriptDropdownList = testExecutionSearchDropdownValues.testScripts;

    this.testDataDescriptionDropdownList = testExecutionSearchDropdownValues.testShortDescription;

    this.testDataCategoryDropdownList = testExecutionSearchDropdownValues.testCategory;

    this.testDataStatusDropdownList = testExecutionSearchDropdownValues.testDataStatus;

    this.jiraStoryDropdownList = testExecutionSearchDropdownValues.jiraStory;

    this.testDataExecutedByDropdownList = testExecutionSearchDropdownValues.executedBy;
    
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
    const testExecutionSummaryrequest:TestExecutionSummarySearchCriteria=
    {
      'testExecutionId':this.testDataIdSelectedList,
      'testDataId':this.testDataIdSelectedList,
      'testDataStatus':this.testDataStatusSelectedList,
      'testCategory':this.testDataCategorySelectedList,
      'jiraStory':this.jiraStorySelectedList,
      'testScripts':this.testScriptSelectedList,
      'testShortDescription':this.testScriptSelectedList,
      'executedBy':this.testDataExecutedBySelectedList
    }

    console.log(testExecutionSummaryrequest);
  }

  clearSearch()
  {

    this.testExecutionIdSelectedList=[];
  this.testDataIdSelectedList=[];
  this.testScriptSelectedList=[];
  this.testDataStatusSelectedList=[];
  this.testDataDescriptionSelectedList=[];
  this.testDataCategorySelectedList=[];
  this.jiraStorySelectedList=[];
  this.testDataExecutedBySelectedList=[];

  }

}
