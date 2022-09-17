import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { Event, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApplicationTableInfoService } from 'src/app/home/my-header/my-application-table-info-service';
import { TestDataSearchCriteria } from 'src/app/home/my-test-data/my-test-data-search/my-test-data-search-criteria';
import { TestDataService } from 'src/app/home/my-test-data/my-test-data.service';
import { NgbModalService } from 'src/app/home/ngbModalService';

import { NewGroup } from './my-new-group';
import { TestScriptGroups } from './my-test-script-groups';
import { TestScriptsService } from './my-test-script-service';
import { TestScript } from './test-scripts';
import { TestScriptExecution } from './test-scripts-execution';
import { TestScriptSearchCriteria } from './test-scripts-search-criteria';

@Component({
  selector: 'app-my-test-scripts',
  templateUrl: './my-test-scripts.component.html',
  styleUrls: ['./my-test-scripts.component.css']
})
export class MyTestScriptsComponent implements OnInit {

  dropdownSettings = {};
  dropdownSingleSelectionSettings = {};

  showSearch: boolean = true;
  showTestScriptsTable: boolean = true;

  testTablesDropdownList:[]=[]
  
  editableTestScript: TestScript | undefined;
  showAddTestscript: boolean = false;

  suiteName: String;
  suiteDescription: string;
  url: String;
  browser: String;
  userName:String;
  password:String;

  testScriptsList: TestScript[] = [];
  previousTestScriptsList: TestScript[] = [];

  listOfTestScriptsToSelected: TestScript[] = [];
  testScriptDetailsUpdate: Map<number, Map<String, String>> = new Map<number, Map<String, String>>();
  testScriptDetailsBackup: Map<number, Map<String, String>> = new Map<number, Map<String, String>>();

  

  testScriptsIdDropdownList: any[] = [];
  testScriptsIdSelectedList: any = [];

  testScriptsDropdownList: any[] = [];
  testScriptsSelectedList: any = [];

  testScriptsCategoryDropdownList: any[] = [];
  testScriptsCategorySelectedList: any = [];

  testScriptsCreatedByDropdownList: any[] = [];
  testScriptsCreatedBySelectedList: any = [];

  testScriptCreatedDateFrom: Date = new Date('2000-01-01'); ;
  testScriptCreatedDateTo: Date = new Date('2999-01-01'); 

  testScriptsUpdatedByDropdownList: any[] = [];
  testScriptsUpdatedBySelectedList: any = [];

  testScriptUpdatedDateFrom: any = new Date('2000-01-01'); 
  testScriptUpdatedDateTo: any = new Date('2999-01-01'); 

  modalOptions:NgbModalOptions;

  
  @ViewChild('newTestScriptName')
  newTestScriptName!: ElementRef<HTMLInputElement>;
  @ViewChild('newTestScriptDescription')
  newTestScriptDescription!: ElementRef<HTMLInputElement>;


  constructor(private testScriptsService: TestScriptsService, private applicationTableInfoService:ApplicationTableInfoService, private ngbModalService:NgbModalService, private testDataService:TestDataService) {
    
    this.modalOptions={

    }
    
    this.suiteName="Suite-001";
    this.suiteDescription="This suite executes regression scenarios";
    this.url="www.google.com";
    this.browser="Chrome";
    this.userName="tamil";
    this.password="tamilarasan";
    
    this.testScriptsService.testScriptsDropdownValuesAsObservable.subscribe(
      {
        next:(value)=>{
          console.log(JSON.stringify(value))
          this.testScriptsIdDropdownList=value.testScriptsId;
          this.testScriptsDropdownList=value.testScripts;
          this.testScriptsCategoryDropdownList=value.testScriptsCategory;
          this.testScriptsCreatedByDropdownList=value.createdBy;
          this.testScriptsUpdatedByDropdownList=value.updatedBy
        }
      }
    )

    this.testScriptsService.testScriptsAsObservable.subscribe(
      {
        next:(value)=>{
          console.log(JSON.stringify(value))
          this.testScriptsList=value;
        }
      }
    )
  }

  ngOnInit(): void {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 0,
      allowSearchFilter: true,
      clearSearchFilter: true,
    };

    this.dropdownSingleSelectionSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 0,
      allowSearchFilter: true,
      clearSearchFilter: true,
    };
    
  }

  showSeachContainer() {
    this.showSearch = !this.showSearch;
  }

  

  fetchTestscripts()
  {
    const testScriptSearchCriteria:TestScriptSearchCriteria=new TestScriptSearchCriteria(
      this.testScriptsIdSelectedList,
      this.testScriptsSelectedList,
      this.testScriptsCategorySelectedList,
      this.testScriptsCreatedBySelectedList,
      this.testScriptCreatedDateFrom,
      this.testScriptCreatedDateTo,
      this.testScriptsUpdatedBySelectedList,
      this.testScriptUpdatedDateFrom,
      this.testScriptUpdatedDateTo
    );
      console.log("TestScripts Request:"+ JSON.stringify(testScriptSearchCriteria))
      this.testScriptsService.fetchTestScripts(this.testScriptsService.applicationSelectedId, testScriptSearchCriteria);
  }

    
  clearSearch() {

    this. testScriptsIdSelectedList = [];
    this. testScriptsSelectedList = [];
    this. testScriptsCategorySelectedList = [];
    this. testScriptsCreatedBySelectedList = [];
    this. testScriptsUpdatedBySelectedList = [];

  }

  onDelete(event: any, testScript: TestScript)
  {
    if(confirm('Are you sure? Do you want to delete this row '+testScript.testScriptsId+' ?'))
    {
      alert('Deleted successfully!');
    }
  }

  onEdit(event: any, testScript: TestScript) {
    this.editableTestScript = testScript;
  }

  onCancel(event: any, testScript: TestScript) {
    if(this.testScriptDetailsUpdate.has(testScript.testScriptsId))
    {
      if(confirm('Are you sure? Do you want to cancel the changes made for this row?'))
      {
       this.testScriptDetailsUpdate.clear();    
        
       }
     }
     this.editableTestScript = undefined;
  }

  eventCheck(event: any, testScriptData: TestScript) {
    if (event.target.checked) {
      this.listOfTestScriptsToSelected.push(testScriptData);
      console.log("Checkbox event: "+JSON.stringify(this.listOfTestScriptsToSelected));
    }
    else {
      this.listOfTestScriptsToSelected.forEach((elementInArray, indexOdElementInArray) => {
        if (elementInArray == testScriptData) {
          this.listOfTestScriptsToSelected.splice(indexOdElementInArray, 1);
          console.log("Checkbox event: "+JSON.stringify(this.listOfTestScriptsToSelected));
        }
      });

    }
  }

  selectAllCheckboxes(event: any) {
    if (event.target.checked) {

    }
    else {

    }

  }

  enableNewTestscriptRow(event: any) {
    this.showAddTestscript = true;
  }

  cancelNewTestscriptRow(event: any) {
    this.showAddTestscript = false;
  }

  saveNewTestscriptDetails(event: any) {
    this.showAddTestscript = false;
  }

  onUpdate(testScript:TestScript) {

      if(this.testScriptDetailsUpdate.has(testScript.testScriptsId))
      {
        for (let [key, value] of this.testScriptDetailsUpdate) {
          console.log(key, value);        
      }
      }
      else{
        alert("No changes were found!")
      }
    // this.enableEditAndDelete(event, testScriptsId, testScript);
  }


  updateExistingTestscriptFieldDetails(event: any, testScriptData: TestScript) {

    console.log(this.testScriptDetailsUpdate.get(testScriptData.testScriptsId));
    const updateColumn = event.target.name;
    const updatedValue = event.target.value;

    console.log(updateColumn + ' Updated Value:' + updatedValue);
    const updateData = new Map<string, string>();
    updateData.set(updateColumn, updatedValue);

    if (this.testScriptDetailsUpdate.has(testScriptData.testScriptsId)) {
      const existingStoredData = this.testScriptDetailsUpdate.get(testScriptData.testScriptsId);
      existingStoredData?.set(updateColumn, updatedValue);
    }
    else {
      this.testScriptDetailsUpdate.set(testScriptData.testScriptsId, updateData);
    }
  }

  

  showTestScriptsGrid() {
    this.showTestScriptsTable = !this.showTestScriptsTable;
  }

  executeTestScriptsBatch() {
    this.dismissModal();
    const testScriptExecution: TestScriptExecution = new TestScriptExecution(
      this.suiteName,
      this.url,
      this.browser,
      this.userName,
      this.password,
      this.listOfTestScriptsToSelected
    );
    console.log("testScriptExecution: "+JSON.stringify(testScriptExecution));
    this.testScriptsService.executeTestScriptsBatch(this.testScriptsService.applicationSelectedId, testScriptExecution)
  }

  addSuiteToExecutionList()
  {
    this.dismissModal();
    const testScriptExecution: TestScriptExecution = new TestScriptExecution(
      this.suiteName,
      this.url,
      this.browser,
      this.userName,
      this.password,
      this.listOfTestScriptsToSelected
    );
    console.log("testScriptExecution: "+JSON.stringify(testScriptExecution));
    this.testScriptsService.addSuiteToExecutionList(this.testScriptsService.applicationSelectedId, testScriptExecution)
  }

  openTestData(testData:String)
  {
   
  }

  openModal(content:any) {
    this.ngbModalService.open(content);
  }

  openBiggerModal(testScriptName:string, content:any) {

    const applicationId=this.applicationTableInfoService.getSeletedApplication();

    this.ngbModalService.openBiggerModal(content);
    const testDataSearchCriteria: TestDataSearchCriteria =
      new TestDataSearchCriteria(
        [],
        [],
        [],
        [],
        [testScriptName],
        [],
        [],
        [],
        [],
        new Date(),
        new Date(),
        [],
        new Date(),
        new Date()
      );

     
    console.log('Test data request : ' + JSON.stringify(testDataSearchCriteria));
    this.testDataService.fetchTestDataMetaFromBackend(applicationId, 2001, testDataSearchCriteria, 0, 10,'testDataMetaId'); 

  }

  dismissModal()
  {
    this.ngbModalService.dismiss();
  }
  
}




