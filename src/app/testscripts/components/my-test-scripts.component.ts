import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApplicationTableInfoService } from 'src/app/public/my-application-table-info-service';

import { NgbModalService } from 'src/app/home/ngbModalService';
import { TestScriptsService } from '../my-test-script-service';
import { TestScript } from '../test-scripts';
import { TestScriptExecution } from '../test-scripts-execution';
import { TestScriptSearchCriteria } from '../test-scripts-search-criteria';
import { TestDataSearchCriteria } from 'src/app/testdata/components/my-test-data-search/my-test-data-search-criteria';
import { TestDataService } from 'src/app/testdata/my-test-data.service';
import { DataUpdate, UpdatedValues } from 'src/app/public/data.update.model';



@Component({
  selector: 'app-my-test-scripts',
  templateUrl: './my-test-scripts.component.html',
  styleUrls: ['./my-test-scripts.component.css']
})
export class MyTestScriptsComponent implements OnInit {

  dropdownSettings = {};
  dropdownSingleSelectionSettings = {};

  showSearch: boolean = false;
  showTestScriptsTable: boolean = false;

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
  updateTestScriptsList: TestScript[]=[];
  testScriptUpdate :DataUpdate  | undefined;

  listOfTestScriptsToSelected: TestScript[] = [];
  testScriptDetailsUpdate: Map<number, Map<string, string>> = new Map<number, Map<string, string>>();
  testScriptDetailsBackup: Map<number, Map<string, string>> = new Map<number, Map<string, string>>();

  

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

    if(this.showSearch)
    {
      this.testScriptsService.fetchTestScriptsDropdownValues(this.applicationTableInfoService.applicationSelected);
    
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
    }
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
    if(confirm('Are you sure? Do you want to delete this Test Script '+testScript.testScriptsId+' ?'))
    {
      this.testScriptsService.deleteTestscript(this.applicationTableInfoService.applicationSelected, testScript).subscribe(
        {
          next:(response)=>
          {
            console.log("Delete Response:" +JSON.stringify(response));
            this.fetchTestscripts();
            alert(JSON.stringify(response));
          }
        }
      )
      
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

  saveNewTestscriptDetails(event: any) 
  {
    const testScripts=(<HTMLInputElement>document.getElementById("newTestScriptName")).value; 
    const testScriptsCategory=(<HTMLInputElement>document.getElementById("newTestScriptCategory")).value; 
    const testScriptsDescription=(<HTMLInputElement>document.getElementById("newTestScriptDescription")).value;
    const createdBy=sessionStorage.getItem("authenticatedUser")!;
    const createdDate: Date=new Date();
    const updatedBy="";
    const updatedDate=new Date();
    const deleteFlag="N";

    const newTestScript:TestScript = {
      testScriptsId:0,
      testScripts:testScripts,
      testScriptsCategory:testScriptsCategory,
      testScriptsDescription:testScriptsDescription,
      createdBy:createdBy,
      createdDate:createdDate,
      updatedBy:updatedBy,
      updatedDate:updatedDate,
      deleteFlag:deleteFlag
    };

      this.testScriptsService.saveTestscript( this.applicationTableInfoService.applicationSelected,newTestScript).subscribe
      (
        {
          next:(response)=>{
            console.log("Saved Record:"+JSON.stringify(response));
            this.showAddTestscript = false;
            alert("Testscript detail saved successfully and ID is "+response.testScriptsId);
          }
        }
      )
    this.showAddTestscript = false;
  }

  onUpdate(testScript:TestScript) {

    if(this.testScriptUpdate)
    {
      let columNameAvailableFlag:boolean=false;
      if(this.testScriptUpdate?.id===testScript.testScriptsId)
      {
        this.testScriptsService.updateTestscript(this.applicationTableInfoService.applicationSelected, this.testScriptUpdate).subscribe(
          {
            next:(value)=>
            {
              console.log("Successful updatation: "+ JSON.stringify(value));
              const removeIndex = this.testScriptsList.findIndex(testScript => testScript.testScriptsId === testScript.testScriptsId);
            //  this.testScriptsList.splice(removeIndex, 1);
              this.testScriptUpdate=undefined;
              this.fetchTestscripts();
              //this.testScriptsList.forEach
            }
          }
        )
      }
      else
      {
        alert("No changes found for this record.")
        // if(confirm("You have unsaved changes in other row do you want to save it? By clicking changes will not be saved."))
        // {
        //   this.testScriptsService.updateTestscript(this.applicationTableInfoService.applicationSelected, this.testScriptUpdate)
        // }
        // else{
        //   this.testScriptUpdate=undefined;
        // }
      }
      // if(this.testScriptDetailsUpdate.has(testScript.testScriptsId))
      // {
      //   for (let [key, value] of this.testScriptDetailsUpdate) {
      //     console.log(key, value);        
      //    }

      //    this.testScriptsService.updateTestscript(this.applicationTableInfoService.applicationSelected, this.testScriptDetailsUpdate).subscribe
      // (
      //   {
      //     next:(response)=>
      //     {
      //       console.log("Updated Testscripts:"+JSON.stringify(response));
      //     }
      //   }
      // )
      // }
      // else{
      //   alert("No changes were found!")
      // }
  // this.enableEditAndDelete(event, testScriptsId, testScript);
  }
  else{
    alert("No changes found for this record.")
  }
}

  updateExistingTestscriptFieldDetails(event: any, testScriptData: TestScript)
  {
   
        let updatedColumn: string = event.target.name;
        let updatedValue: string = event.target.value;

        const testScriptUpdatedValues: UpdatedValues ={
          columnName: updatedColumn,
          columnValue: updatedValue
        }
        
        if(this.testScriptUpdate)
        {
          let columNameAvailableFlag:boolean=false;
          if(this.testScriptUpdate.id===testScriptData.testScriptsId)
          {
            this.testScriptUpdate.values.forEach(item=> 
            {
              if(item.columnName===updatedColumn)
              {
                item.columnValue=updatedValue;
                columNameAvailableFlag=true;
              }
            })

            if(columNameAvailableFlag===false)
            {
              console.log("this.testScriptUpdate before:"+JSON.stringify(this.testScriptUpdate))
              this.testScriptUpdate.values.push(testScriptUpdatedValues);
              console.log("this.testScriptUpdate after:"+JSON.stringify(this.testScriptUpdate))
            }
          
          }
        }
        else{
          this.testScriptUpdate={
            id:testScriptData.testScriptsId,
            values:[testScriptUpdatedValues]
          }
        }

        console.log("this.testScriptUpdate:"+JSON.stringify(this.testScriptUpdate))
      }
    
    
  

  updateExistingTestscriptFieldDetails1(event: any, testScriptData: TestScript) {

    console.log(this.testScriptDetailsUpdate.get(testScriptData.testScriptsId));
    let updateColumn = event.target.name;
    let updatedValue = event.target.value;

    console.log(updateColumn + ' Updated Value:' + updatedValue);
    let updateData = new Map<string, string>();
    updateData.set(updateColumn, updatedValue);

    if (this.testScriptDetailsUpdate.has(testScriptData.testScriptsId)) {
      let existingStoredData:Map<String, String> = this.testScriptDetailsUpdate.get(testScriptData.testScriptsId)!;
      existingStoredData.set(updateColumn, updatedValue);
    }
    else {
      this.testScriptDetailsUpdate.set(testScriptData.testScriptsId, updateData);
    }

    console.log("After adding update to Map:" +this.testScriptDetailsUpdate);
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




