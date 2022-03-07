import { keyframes } from '@angular/animations';
import { KeyValue } from '@angular/common';
import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApplicationTableInfoService } from '../../my-header/my-application-table-info-service';
import { TestDataService } from '../my-test-data.service';
import { TestFieldsInfo } from '../my-test-fields-info';
import { TestData } from './my-test-data';
import { TestDataMeta } from './my-test-data-meta';

@Component({
  selector: 'app-my-test-data-results',
  templateUrl: './my-test-data-results.component.html',
  styleUrls: ['./my-test-data-results.component.css']
})
export class MyTestDataResultsComponent implements OnInit {

  @Input()
  testFieldsInfo:TestFieldsInfo[];
  
  testDataMetaValuesAsObjectList: TestDataMeta[];
 

  testfieldsSelectedList:TestFieldsInfo[];
  testfieldsNotSelectedList: TestFieldsInfo[];

  dataCollectionSize: number;
  page: number;
  pageSize: number;

  constructor(private testDataService: TestDataService, private applicationTableInfoService: ApplicationTableInfoService ) { 
    

    
    this.testDataMetaValuesAsObjectList=[];
    this.testFieldsInfo=[];

    console.log("Test Fields Info in MyTestDataResultsComponent:"+this.testFieldsInfo.length);
   
    this.testfieldsSelectedList=[];
    this.testfieldsNotSelectedList=[];
    

    this.testDataService.getTestDataMetaValuesAsObservable();

    this.dataCollectionSize= this.testDataMetaValuesAsObjectList.length;
    this.page = 1;
    this.pageSize = 10;

    this.selectColumnsDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      clearSearchFilter: true,
    };  
  }


  selectColumnsDropdownSettings: IDropdownSettings = {};

  // listOfTestData:TestData[]=[]
  editableTestData: TestDataMeta | undefined;
  testDataMetaDetailsToUpdate: Map<number, Map<number, String>> = new Map<number, Map<number, String>>();
  testDataDetailsToUpdate: Map<number, Map<number, String>> = new Map<number, Map<number, String>>();
  listOfTestDataSelected: TestDataMeta[] = [];
 
  filteredColumnsDropdownList: string[] = [];
   

  enableColumnDropdown: boolean = false;
  enableExportDropdown: boolean = false;

  ngOnInit(): void {

    console.log("Test Fields Info in MyTestDataResultsComponent:"+this.testFieldsInfo.length);

 
    this.testDataService.testDataMetaValuesAsObservable.subscribe(
      {
        next:(v)=>
        {
          this.testDataMetaValuesAsObjectList=v;
         // console.log("getTestDataMetaValuesAsObservable() Test Data Meta:"+JSON.stringify(testDataMeta))
        }

      }
    )
  }

  ngOnChanges()
  {
    console.log("ngOnChanges!!")
    console.log("Test Fields Info in MyTestDataResultsComponent:"+this.testFieldsInfo.length);

  }
  ngDoCheck()
  {
   // this.testDataMeta =this.testDataService.getTestDataMetaValuesAsObservable();
  }

  metaDataHeaders()
  {
     return this.testDataMetaValuesAsObjectList[0];
  }

  appDataHeaders()
  {
     return this.testDataMetaValuesAsObjectList[0].testDataApp[0];
  }

  onSelectAll(event: any) {

  }

  onItemSelect(event: any) {

  }

  showColumnDropdown(event: any) {
    console.log(event)
    this.enableColumnDropdown = true;
  }

  hideColumnDropdown(event: any) {
    console.log(event)
    this.enableColumnDropdown = false;
  }

  checked(field_id:number)
  {
    let checked: boolean=false;
    this.testfieldsSelectedList.find(element=>{
      if(element.$field_id===field_id)
      {
        checked=true;
      }
    })

    return checked;
  }

  updateColumnsVisible(event: any, field:TestFieldsInfo) {
    if (event.target.checked === false) {
      let tempTestFieldsInfo=this.testfieldsSelectedList;
        for(let i=0;i<=tempTestFieldsInfo.length;i++)
        {
          if(tempTestFieldsInfo[i].$field_id===field.$field_id)
          {
            this.testfieldsSelectedList.slice(1,1);
          }
        }
    }
    else if (event.target.checked === true) {
      this.testfieldsSelectedList.push(field);
      console.log('Added : ' + JSON.stringify(field));
    }
  }

  testTemp(event: any, field: any) {
   console.log(field);
  }

  searchColumnsInDropdown(event: any) {
    // const expectedValue: string = event.target.value;
    // console.log('Typed Char is ' + expectedValue);

    // const columnFilteredSearchResults: string[] = [];
    // for (let value of this.columnMap.values()) {
    //   console.log('Loop current value is ' + value);
    //   if (value.includes(expectedValue)) {
    //     columnFilteredSearchResults.push(value);
    //   }
    // }
    // console.log(columnFilteredSearchResults);
    // this.filteredColumnsDropdownList = columnFilteredSearchResults;
  }

  showExportOptions() {
    this.enableExportDropdown = !this.enableExportDropdown;
  }


  onDelete(event: any, testDataMeta:TestDataMeta, testData: TestData) {
    if (confirm('Are you sure? Do you want to delete this row ' + testDataMeta.testDataMetaId + ' ?')) {
      alert('Deleted successfully!');
    }
  }

  checkboxActions(event: any, testDataMeta:TestDataMeta) {
  
    if (event.target.checked) {
     this.listOfTestDataSelected.push(testDataMeta);
      console.log(this.listOfTestDataSelected);
    }
    else {
      this.listOfTestDataSelected.forEach((elementInArray, indexOdElementInArray) => {
        if (elementInArray == testDataMeta) {
          this.listOfTestDataSelected.splice(indexOdElementInArray, 1);
          console.log(this.listOfTestDataSelected);
        }
      });

    }
  }

  onEdit(event: any, testDataMeta:TestDataMeta, testData: TestData) {
    
    if((this.testDataMetaDetailsToUpdate.size>0) || (this.testDataDetailsToUpdate.size>0)) {
      if (confirm('There are some unsaved changes for, do you want to save them before modifying other rows?')) {
        alert('Updated successfully!');
      }
      else{
        alert('Previous changes are not saved')
        this.editableTestData = testDataMeta;
      }
    }
    else{
      this.editableTestData = testDataMeta;
    }

  }

  onCancel(event: any, testDataMeta:TestDataMeta, testData: TestData) {
    if (this.testDataDetailsToUpdate.has(testDataMeta.testDataMetaId)) {
      if (confirm('Are you sure? Do you want to cancel the changes made for this row?')) {
        this.testDataDetailsToUpdate.clear();

      }
    }
    this.editableTestData = undefined;
  }

  onUpdate(event: any, testDataMeta:TestDataMeta, testData: TestData) {

    if (this.testDataMetaDetailsToUpdate.has(testDataMeta.testDataMetaId)) {
      for (let [key, value] of this.testDataMetaDetailsToUpdate) {
        console.log(key, value);
        alert("Updated Successfully!")
      }
    }
    else if (this.testDataDetailsToUpdate.has(testData.testDataId)) {
      for (let [key, value] of this.testDataDetailsToUpdate) {
        console.log(key, value);
        alert("Updated Successfully!")
      }
    }
    else {
      alert("No changes were found!")
    }
    // this.enableEditAndDelete(event, testScriptId, testScript);
  }

  showTestDataMetaFieldValue(fieldName:string): boolean
  {
    let returnValue:boolean=false;
    // this.testFieldsInfo.find(element=>
    //   {
    //     let field_name_api=element.field_name_api;
    //     if(field_name_api===fieldName)
    //     {
    //       this.testfieldsSelectedList.find(element=>
    //         {
    //           if(element.field_name_api===fieldName)
    //           {
    //             returnValue=true;
    //           }
    //         }
    //         )
    //     }
    //   })

          this.testfieldsSelectedList.find(element=>
            {
              if(element.field_name_api===fieldName)
              {
                returnValue=true;
              }
            }
            )

      return returnValue;
  }

  updateExistingTestDataMetaDetails(event: any, testDataMeta:TestDataMeta) {

    console.log(this.testDataMetaDetailsToUpdate.get(testDataMeta.testDataMetaId));
    const updateColumn = event.target.name;
    const updatedValue = event.target.value;

    console.log(updateColumn + ' Updated Value:' + updatedValue);
    const updateData = new Map<number, string>();
    updateData.set(updateColumn, updatedValue);

    if (this.testDataMetaDetailsToUpdate.has(testDataMeta.testDataMetaId)) {
      const existingStoredData = this.testDataMetaDetailsToUpdate.get(testDataMeta.testDataMetaId);
      existingStoredData?.set(updateColumn, updatedValue);
    }
    else {
      this.testDataMetaDetailsToUpdate.set(testDataMeta.testDataMetaId, updateData);
    }
  }

  updateExistingTestDataFieldDetails(event: any, testData:TestData) {

    console.log(this.testDataDetailsToUpdate.get(testData.testDataId));
    const updateColumn = event.target.name;
    const updatedValue = event.target.value;

    console.log(updateColumn + ' Updated Value:' + updatedValue);
    const updateData = new Map<number, string>();
    updateData.set(updateColumn, updatedValue);

    if (this.testDataDetailsToUpdate.has(testData.testDataId)) {
      const existingStoredData = this.testDataDetailsToUpdate.get(testData.testDataId);
      existingStoredData?.set(updateColumn, updatedValue);
    }
    else {
      this.testDataDetailsToUpdate.set(testData.testDataId, updateData);
    }
  }

  eventCheck(event: any, testDataMeta: TestDataMeta) {
    if (event.target.checked) {
      this.listOfTestDataSelected.push(testDataMeta);
      console.log(this.listOfTestDataSelected);
    }
    else {
      this.listOfTestDataSelected.forEach((elementInArray, indexOdElementInArray) => {
        if (elementInArray == testDataMeta) {
          this.listOfTestDataSelected.splice(indexOdElementInArray, 1);
          console.log(this.listOfTestDataSelected);
        }
      });

    }
  }

  getColumnValue(testDataMeta:TestDataMeta) {

  }

  

  pageChange() {

  }

  deleteSelectedTestData() {
    if (confirm("Are you sure do you want to delete the selected test data?")) {
      alert("Selected test data deleted successfully!")
    }
  }

  cloneSelectedTestData() {
    if (confirm("Are you sure do you want to clone the selected test data?")) {
      console.log("List of records to be cloned:" +JSON.stringify(this.listOfTestDataSelected))
      this.testDataService.cloneTestData(this.listOfTestDataSelected);
      alert("Selected test data cloned successfully!")
    }
  }
  unsorted():number
  { 
    return 0;
  }

  mySortOrder = (a: any, b: any): number => {   

for (let key in this.testFieldsInfo) {

  if(key===a.key)
  {
  let value = this.testFieldsInfo[key];
  }
  // Use `key` and `value`
}
    const a_key=JSON.stringify(a.key);
    const b_key=JSON.stringify(b.key);

    let a_key_found: boolean=false;
    let b_key_found: boolean=false;

    let a_key_order: number=0;
    let b_key_order: number=0;

    let returnNum: number=0;

    this.testFieldsInfo.find(element=>{
      if(element.field_name_api===a.key)
      {
        a_key_found=true;
        a_key_order=+element.field_order;
      }

      if(element.field_name_api===b.key)
      {
        b_key_found=true;
        b_key_order=+element.field_order;
      }
    })

    if(!a_key_found && !b_key_found)
    {
      returnNum= 0;
    }
    else if(!a_key_found && b_key_found)
    {
      returnNum= -1;
    }
    else if(a_key_found && !b_key_found)
    {
      returnNum= 1;
    }
    else if(a_key_order > b_key_order)
    {
      returnNum= 1;
    }
    else if(a_key_order < b_key_order)
    {
      returnNum= -1;
    }

    console.log("a:"+JSON.stringify(a.key)+" b:"+JSON.stringify(b.key));
    console.log("a_key_found :"+a_key_found+" b_key_found:"+b_key_found);
    console.log("a_key_order :"+a_key_order+" b_key_order:"+b_key_order);
    console.log("Returns: "+returnNum)

    return returnNum;
 }

  getTestData(testDataMeta: TestDataMeta):TestData[]
  {
    console.log(testDataMeta.testDataApp);
    return testDataMeta.testDataApp;
  }

  getMetaField(testDataMeta:TestDataMeta,fieldName: string): string
  {
    const testDataMetaMap = new Map(Object.entries(testDataMeta));
    const value:string =testDataMetaMap.get(fieldName);
    console.log("Value:"+value+"Map:"+testDataMetaMap)
    return testDataMetaMap.get(fieldName);
  }

  getAppTestData(metaData: Map<string, string>): Map<string, string>
  {
    const object: any= metaData.get("testDataApp");
    const map: Map<string, string>=this.testDataService.objectToMap(object);
    console.log("getAppTestData():"+map)
    return map;
  }
}