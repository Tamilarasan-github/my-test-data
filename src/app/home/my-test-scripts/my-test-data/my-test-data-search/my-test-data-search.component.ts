import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-my-test-data-search',
  templateUrl: './my-test-data-search.component.html',
  styleUrls: ['./my-test-data-search.component.css']
})
export class MyTestDataSearchComponent implements OnInit {

  constructor() { }

  showSearch:boolean=true;

  searchDropdownSettings:IDropdownSettings={};

  testDataIdDropdownList:any[]= [];
  testDataIdSelectedList:any=[];

  testScriptDropdownList:any[]= [];
  testScriptSelectedList:any=[];

  testDataDescriptionDropdownList:any[]= [];
  testDataDescriptionSelectedList:any=[];

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

    this.testDataIdDropdownList = [
      { item_id: 1, item_text: 'Test 1' },
      { item_id: 2, item_text: 'Test 2' },
      { item_id: 3, item_text: 'Test 3' },
      { item_id: 4, item_text: 'Test 4' },
      { item_id: 5, item_text: 'Test 5' }
    ];

    this.testDataIdSelectedList = [
      { item_id: 1, item_text: 'Test 1' },
      { item_id: 2, item_text: 'Test 2' },
      { item_id: 3, item_text: 'Test 3' },
      { item_id: 4, item_text: 'Test 4' },
      { item_id: 5, item_text: 'Test 5' }
    ];

    this.testScriptDropdownList = [
      { item_id: 1, item_text: 'Test 1' },
      { item_id: 2, item_text: 'Test 2' },
      { item_id: 3, item_text: 'Test 3' },
      { item_id: 4, item_text: 'Test 4' },
      { item_id: 5, item_text: 'Test 5' }
    ];

    this.testScriptSelectedList = [
      { item_id: 1, item_text: 'Test 1' },
      { item_id: 2, item_text: 'Test 2' },
      { item_id: 3, item_text: 'Test 3' },
      { item_id: 4, item_text: 'Test 4' },
      { item_id: 5, item_text: 'Test 5' }
    ];
    
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

}
