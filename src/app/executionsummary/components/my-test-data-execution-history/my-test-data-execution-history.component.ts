import { Component, Input, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TestExecutionSummaryService } from '../my-test-execution-summary/my-test-execution-summary-service';

import { TestDataMetaExecutionHistory } from './my-test-data-meta-execution-history';


@Component({
  selector: 'app-my-test-execution-results',
  templateUrl: './my-test-data-execution-history.component.html',
  styleUrls: ['./my-test-data-execution-history.component.css']
})
export class MyTestExecutionResultsComponent implements OnInit {
 

  testDataMetaExecutionHistoryList: TestDataMetaExecutionHistory[];

  constructor(private testExecutionSummaryService:TestExecutionSummaryService) 
  { 
    this.testDataMetaExecutionHistoryList=[];

    this.testExecutionSummaryService.testDataMetaExecutionHistoryAsObservable.subscribe(
      {
        next:(value)=>this.testDataMetaExecutionHistoryList=value
      }
    )
  }

  @Input()
  listOfTestExecutionResultsReceived: TestDataMetaExecutionHistory[] = [];

  @Input()
  dataCollectionSize:number=0;

  page = 1;
  pageSize = 10;
 
  showTestDataExecTable:boolean=true;
  selectColumnsDropdownSettings: IDropdownSettings = {};

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


  ngOnInit(): void {
  }

  showTestDataExecTableContainer()
  {
    this.showTestDataExecTable=!this.showTestDataExecTable;
  }
}
