import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MyTestDataService } from '../my-test-data.service';
import { TestData } from './my-test-data-results/my-test-data';
import { TestDataSearchCriteria } from './my-test-data-search-criteria';

@Component({
  selector: 'app-my-test-data-search',
  templateUrl: './my-test-data-search.component.html',
  styleUrls: ['./my-test-data-search.component.css']
})
export class MyTestDataSearchComponent implements OnInit {

  constructor(private testDataService:MyTestDataService) { }

 
  listOfTestData:TestData[]=[];

  testDataDropdownValues:any;

  showSearch:boolean=true;

  searchDropdownSettings:IDropdownSettings={};

  testDataIdDropdownList:string[]= [];
  testDataIdSelectedList:any=[];

  testScriptDropdownList:any[]= [];
  testScriptSelectedList:any=[];

  testDataShortDescriptionDropdownList:any[]= [];
  testDataShortDescriptionSelectedList:any=[];

  testDataCategoryDropdownList:any[]= [];
  testDataCategorySelectedList:any=[];

  jiraStoryDropdownList:any[]= [];
  jiraStorySelectedList:any=[];

  testRunFlagDropdownList:any[]= [];
  testRunFlagSelectedList:any=[];

  testDataCreatedByDropdownList:any[]= [];
  testDataCreatedBySelectedList:any=[];

  testDataUpdatedByDropdownList:any[]= [];
  testDataUpdatedBySelectedList:any=[];

 
  ngOnInit(): void {
   
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
    this.testDataDropdownValues=this.testDataService.fetchDropdownValues();

    this.testDataIdDropdownList =  this.testDataDropdownValues['testDataId'];
    this.testScriptDropdownList = this.testDataDropdownValues['testScripts'];
    this.testDataShortDescriptionDropdownList=this.testDataDropdownValues['testShortDescription'];
    this.testDataCategoryDropdownList=this.testDataDropdownValues['testCategory'];
    this.jiraStoryDropdownList=this.testDataDropdownValues['jiraStory'];
    this.testRunFlagDropdownList=this.testDataDropdownValues['runFlag'];
    this.testDataCreatedByDropdownList=this.testDataDropdownValues['createdBy'];
    this.testDataUpdatedByDropdownList=this.testDataDropdownValues['updatedBy'];
    
  }

  onItemSelect(event:any)
  {
    console.log('Dropdown Item Select Event: '+event);
  }

  onSelectAll(event:any)
  {
    console.log('Dropdown Select All Event: '+event);
  }

  showSeachContainer()
  {
    this.showSearch=!this.showSearch;
  }

  fetchTestData()
  {
    const testDataRequest:TestDataSearchCriteria={
      'testDataId':this.testDataIdSelectedList,
      'testCategory':this.testDataCategorySelectedList,
      'jiraStory':this.jiraStorySelectedList,
      'runFlag':this.testRunFlagSelectedList,
      'testScripts':this.testScriptSelectedList,
      'testShortDescription':this.testDataShortDescriptionSelectedList,
      'createdBy':this.testDataCreatedBySelectedList,
      'updatedBy':this.testDataUpdatedBySelectedList
    }

    console.log('Test data request : '+JSON.stringify(testDataRequest));

    this.listOfTestData=this.testDataService.fetchTestData();
    console.log(this.listOfTestData)
  }

  clearSearch()
  {

  this.testDataIdSelectedList=[];
  this.testScriptSelectedList=[];
  this.testDataShortDescriptionSelectedList=[];
  this.testDataCategorySelectedList=[];
  this.jiraStorySelectedList=[];
  this.testRunFlagSelectedList=[];
  this.testDataCreatedBySelectedList=[];
  this.testDataUpdatedBySelectedList=[];

  }

}
