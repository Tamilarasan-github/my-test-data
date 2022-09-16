
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { IDropdownSettings } from 'ng-multiselect-dropdown';

import { ApplicationTableInfoService } from '../../my-header/my-application-table-info-service';
import { NgbModalService } from '../../ngbModalService';
import { TestDataSearchCriteria } from '../my-test-data-search/my-test-data-search-criteria';
import { TestDataService } from '../my-test-data.service';
import { TestFieldsInfo } from '../my-test-fields-info';
import { TestDataAppOneTableOne } from './my-test-data-app-one-table-one';
import { TestDataMeta } from './my-test-data-meta';

@Component({
  selector: 'app-my-test-data-results',
  templateUrl: './my-test-data-results.component.html',
  styleUrls: ['./my-test-data-results.component.css']
})
export class MyTestDataResultsComponent implements OnInit {
 
  show:boolean=false;
  testDataMetaValuesAsObjectList: TestDataMeta[];
  clonedTestDataMetaValuesAsObject: TestDataMeta[];
  currentlyInEditTestDataMetaRecord: TestDataMeta | undefined;
  newChangesTestDataMetaValuesAsObject: any={};
  newChangesTestDataAppOneTableOne: Map<number, any>=new Map<number, any>();

  testDataAppOneUIScreenNamesInfo:string[];
  testFields:TestFieldsInfo[];
  testDataMetaAppOneFieldsInfo:TestFieldsInfo[];
  testDataAppOneTableOneFieldsInfo:TestFieldsInfo[];
  testDataAppOneTableTwoFieldsInfo:TestFieldsInfo[];

  testfieldsSelectedList:Set<TestFieldsInfo>;
  testfieldsNotSelectedList: TestFieldsInfo[];

  testApplicationId: number;
  selectedTestTableId: number;

 
  numOfRecordsToShowInAPage: number;
  totalNumOfRecords: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;

  
  selectColumnsDropdownSettings: IDropdownSettings = {};

  testDataMetaDetailsToUpdate: Map<number, Map<number, String>> = new Map<number, Map<number, String>>();
  testDataDetailsToUpdate: Map<number, Map<number, String>> = new Map<number, Map<number, String>>();
  listOfTestDataSelected: TestDataMeta[] = [];
  testDataMetaIdSelectedSet: Set<number>;
 
  filteredColumnsDropdownList: string[] = [];
   

  enableColumnDropdown: boolean = false;
  enableExportDropdown: boolean = false;

  testDataSearchedCriteria: TestDataSearchCriteria;

  constructor(private testDataService: TestDataService, private applicationTableInfoService: ApplicationTableInfoService, private ngbModalService:NgbModalService) { 
    
    this.testDataSearchedCriteria=new TestDataSearchCriteria([],[],[],[],[],[],[],[],[],new Date,new Date,[],new Date,new Date);

   this.testDataMetaValuesAsObjectList=[];
   this.clonedTestDataMetaValuesAsObject=[];
  
   this.testDataAppOneUIScreenNamesInfo=[];
   this.testFields=[];
    this.testDataMetaAppOneFieldsInfo=[];
    this.testDataAppOneTableOneFieldsInfo=[];
    this.testDataAppOneTableTwoFieldsInfo=[];

    this.testfieldsSelectedList=new Set<TestFieldsInfo>();
    this.testfieldsNotSelectedList=[];

    this.testDataMetaIdSelectedSet=new Set<number>();
    
    this.selectedTestTableId=0;
    this.testApplicationId=0;

    this.numOfRecordsToShowInAPage=10;
    this.totalNumOfRecords= 0;
    this.currentPage= 0;
    this.totalPages= 0;
    this.hasNextPage= false;
    this.hasPreviousPage= false;

    this.testDataService.tableSelectedAsObservable.subscribe(
      {
        next:(value)=> {
          this.selectedTestTableId=value;
          this.testFields=[];
          this.testDataAppOneUIScreenNamesInfo=[];
          if(value==2001)
          {
            this.testDataAppOneTableOneFieldsInfo.forEach(elements=>
              {
                this.testFields.push(elements);
              })
          }
          else if(value=2002)
          {
            this.testDataAppOneTableTwoFieldsInfo.forEach(elements=>
              {
                this.testFields.push(elements);
              })
          }

          this.testDataMetaAppOneFieldsInfo.forEach(elements=>
            {
              this.testFields.push(elements);
            })

          this.testFields.forEach(element=>{
          if(!this.testDataAppOneUIScreenNamesInfo.includes(element.ui_screen_name))
          {
          this.testDataAppOneUIScreenNamesInfo.push(element.ui_screen_name);
          }
          })
        }
      }
    )

    this.applicationTableInfoService.applicationSelectedAsObservable.subscribe(
      {
        next:(value)=> this.testApplicationId=value
      }
    )


    this.testDataService.testDataMetaAppOneFieldsInfoAsObservable.subscribe({
      next:(value)=>
      {
        this.testDataMetaAppOneFieldsInfo=value;
        console.log("Received Meta Data Headers/Columns:"+this.testDataMetaAppOneFieldsInfo);
        this.testDataMetaAppOneFieldsInfo.forEach(element=>{
          this.testfieldsSelectedList.add(element);
        })
        console.log("Selected Meta Data Headers/Columns:"+this.testfieldsSelectedList);
        
      }
    })

    this.testDataService.testDataAppOneTableOneFieldsInfoAsObservable.subscribe({
      next:(value)=>{
        this.testDataAppOneTableOneFieldsInfo=value;
       // console.log("this.appDataTestFieldsInfo is loaded:"+JSON.stringify(this.appDataTestFieldsInfo))
        this.testDataAppOneTableOneFieldsInfo.forEach(element=>{
          this.testfieldsSelectedList.add(element);
        })
      }
    })

    this.testDataService.testDataAppOneTableTwoFieldsInfoAsObservable.subscribe({
      next:(value)=>{
        this.testDataAppOneTableTwoFieldsInfo=value;
       // console.log("this.appDataTestFieldsInfo is loaded:"+JSON.stringify(this.appDataTestFieldsInfo))
        this.testDataAppOneTableTwoFieldsInfo.forEach(element=>{
          this.testfieldsSelectedList.add(element);
        })
      }
    })



    this.testDataService.testDataMetaValuesAsObservable.subscribe(
      {
        next:(v)=>
        {
          this.testDataMetaValuesAsObjectList=v;
          //this.dataCollectionSize= this.testDataMetaValuesAsObjectList.length;
          //console.log("getTestDataMetaValuesAsObservable() Test Data Meta:"+JSON.stringify(this.testDataMetaValuesAsObjectList))
        }

      }
    )

    this.testDataService.testDataNumOfElementsAsObservable.subscribe({
      next:(value)=>
      {
        this.totalNumOfRecords=value;
        console.log("totalNumOfRecords:"+this.totalNumOfRecords);
      }
    })

    this.testDataService.testDataTotalPagesAsObservable.subscribe({
      next:(value)=>
      {
        this.totalPages=value;
        console.log("totalPages:"+this.totalPages);
      }
    })

    this.testDataService.testDataHasNextAsObservable.subscribe({
      next:(value)=>
      {
        this.hasNextPage=value;
        console.log("hasNextPage:"+this.hasNextPage);
      }
    })

    this.testDataService.testDataHasPreviousAsObservable.subscribe({
      next:(value)=>
      {
        this.hasPreviousPage=value;
        console.log("hasPreviousPage:"+this.hasPreviousPage);
      }
    }) 

    this.testDataService.testDataCurrentPageAsObservable.subscribe({
      next:(value)=>
      {
        this.currentPage=value;
        console.log("currentPage:"+this.currentPage);
      }
    })

    this.testDataService.testDataSearchCriteriaAsObservable.subscribe({
      next:(value)=>
      {
        this.testDataSearchedCriteria=value;
        console.log("Searched Criteria:"+this.testDataSearchedCriteria);
      }
    })

    this.testDataService.clonedTestDataMetaValuesAsObservable.subscribe({
      next:(value)=>
      {
        this.clonedTestDataMetaValuesAsObject=value;
        console.log("Cloned record alone:"+JSON.stringify(this.clonedTestDataMetaValuesAsObject));
      }
    })

    

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



  ngOnInit(): void {
    
  }

  ngOnChanges()
  {
    console.log("ngOnChanges!!")
  }
  ngDoCheck()
  {
   
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
   
    this.testfieldsSelectedList.forEach(element=>{
      if(element.field_id===field_id)
      {
        checked=true;
      }
    })

    return checked;
  }

  updateColumnsVisibleByUIScreenName(event: any, screenName: string)
  {
    if (event.target.checked === false) {
      this.testfieldsSelectedList.forEach(element =>
        {
          console.log("element.field_id:"+element.field_id);
          if(element.ui_screen_name === screenName)
          {
            this.testfieldsSelectedList.delete(element);
          }
        });
    }
    else if (event.target.checked === true) {

      this.testFields.forEach(element =>
        {
          console.log("element.ui_screen_name:"+element.ui_screen_name);
          if(element.ui_screen_name === screenName)
          {
            this.testfieldsSelectedList.add(element);
            console.log('Added : ' + JSON.stringify(element));
          }
        });
      
    }
  }

  updateColumnsVisible(event: any, field: TestFieldsInfo) {
    if (event.target.checked === false) {
      let tempTestFieldsInfo = this.testfieldsSelectedList;
      this.testfieldsSelectedList.forEach(element =>
        {
          console.log("element.field_id:"+element.field_id);
          if(element.field_id === field.field_id)
          {
            this.testfieldsSelectedList.delete(element);
          }
        });
    }
    else if (event.target.checked === true) {
      this.testfieldsSelectedList.add(field);
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


  onDelete(event: any, testDataMeta:TestDataMeta, testData: TestDataAppOneTableOne) {
    if(confirm("Are you sure do you want to delete this record?"))
    {
    const testDataToBeDeleted: TestDataMeta[] = [testDataMeta];
    this.testDataService.deleteTestData(this.testApplicationId, this.selectedTestTableId, testDataToBeDeleted)
    }
  }

  checkboxActions(event: any, testDataMeta:TestDataMeta) {
  
    if (event.target.checked) {

      if(!this.testDataMetaIdSelectedSet.has(testDataMeta.testDataMetaId))
      {
        this.testDataMetaIdSelectedSet.add(testDataMeta.testDataMetaId);
        this.listOfTestDataSelected.push(testDataMeta);
        console.log(this.listOfTestDataSelected);
      }
    }
    else {
      this.testDataMetaIdSelectedSet.delete(testDataMeta.testDataMetaId);

      this.listOfTestDataSelected.forEach((elementInArray, indexOdElementInArray) => {
        if (elementInArray == testDataMeta) {
          this.listOfTestDataSelected.splice(indexOdElementInArray, 1);
          console.log(this.listOfTestDataSelected);
        }
      });

    }
  }

  showEditIcon(testDataMeta:TestDataMeta):boolean
  {
    let flag: boolean=true;
    if(this.currentlyInEditTestDataMetaRecord!==undefined)
    {
      if(this.currentlyInEditTestDataMetaRecord.testDataMetaId===testDataMeta.testDataMetaId)
      {
        flag=false;
      }
    }
    console.log("Show Edit Icon:"+flag);
    this.show=!this.show;
    return flag;  
  }

  onEdit(event: any, testDataMeta:TestDataMeta, testData: TestDataAppOneTableOne) {
    console.log("onEdit is triggered..!!")
    if( this.currentlyInEditTestDataMetaRecord==undefined)
    {
    this.currentlyInEditTestDataMetaRecord=testDataMeta;
    this.newChangesTestDataMetaValuesAsObject["testDataMetaId"]=testDataMeta.testDataMetaId;
    this.newChangesTestDataMetaValuesAsObject["testTableId"]=this.selectedTestTableId;
    }
    else if(this.currentlyInEditTestDataMetaRecord.testDataMetaId!=testDataMeta.testDataMetaId)
    {
      if(confirm("There are some unsaved changes, do you want to save them before proceeding?"))
      {
        this.testDataService.updateTestData(this.testApplicationId, this.selectedTestTableId,this.currentlyInEditTestDataMetaRecord);
       
      }
      this.currentlyInEditTestDataMetaRecord=testDataMeta;
      this.newChangesTestDataMetaValuesAsObject["testDataMetaId"]=testDataMeta.testDataMetaId;
      this.newChangesTestDataMetaValuesAsObject["testTableId"]=this.selectedTestTableId;
    }
    console.log("Editing the record:"+JSON.stringify(this.currentlyInEditTestDataMetaRecord));


  }

  onCancel(event: any, testDataMeta:TestDataMeta, testData: TestDataAppOneTableOne) {
  
    if (this.currentlyInEditTestDataMetaRecord===testDataMeta) {
      if (confirm('Are you sure do you want to cancel the changes made for this record?')) {
      this.currentlyInEditTestDataMetaRecord=undefined;
      this.newChangesTestDataMetaValuesAsObject={};
      }
    }
   console.log("onCancel updates:"+JSON.stringify(this.newChangesTestDataMetaValuesAsObject))
  }

  onUpdate(event: any, testDataMeta:TestDataMeta, testData: TestDataAppOneTableOne) {
    let testDataAppOneTableOne: any[]=[];

    this.newChangesTestDataAppOneTableOne.forEach((value: any, key: any) => {
      console.log("value: "+value);
      testDataAppOneTableOne.push(value);
    })
   
    this.newChangesTestDataMetaValuesAsObject["testDataAppOneTableOne"]=testDataAppOneTableOne;
    console.log("Final changes Save:"+JSON.stringify(this.newChangesTestDataMetaValuesAsObject));
    this.testDataService.updateTestData(this.testApplicationId, this.selectedTestTableId, this.newChangesTestDataMetaValuesAsObject)
  }

  onAdd(event: any, testDataMeta:TestDataMeta, testData: TestDataAppOneTableOne) {

    if(this.currentlyInEditTestDataMetaRecord==undefined)
    {
    this.currentlyInEditTestDataMetaRecord=testDataMeta;
    this.testDataMetaValuesAsObjectList.find(element=>
      {
        if(element.testDataMetaId===testDataMeta.testDataMetaId)
        {
          element.testDataAppOneTableOne.push(new TestDataAppOneTableOne());
        }
      })
    }
    else if(this.currentlyInEditTestDataMetaRecord.testDataMetaId!=testDataMeta.testDataMetaId)
    {
      if(confirm("There are some unsaved changes, do you want to save them before proceeding?"))
      {
        this.testDataService.updateTestData(this.testApplicationId, this.selectedTestTableId,this.currentlyInEditTestDataMetaRecord);
      }
      
      this.currentlyInEditTestDataMetaRecord=testDataMeta;

      this.testDataMetaValuesAsObjectList.find(element=>
        {
          if(element.testDataMetaId===testDataMeta.testDataMetaId)
          {
            element.testDataAppOneTableOne.push(new TestDataAppOneTableOne());
          }
        })
    }
    console.log("Editing the record:"+JSON.stringify(this.currentlyInEditTestDataMetaRecord));    

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

          this.testfieldsSelectedList.forEach(element=>
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

    const updateColumn = event.target.name;
    const updatedValue = event.target.value;
  
    this.newChangesTestDataMetaValuesAsObject[updateColumn as keyof typeof this.newChangesTestDataMetaValuesAsObject]=updatedValue;
    
    console.log("Updates are..:"+JSON.stringify(this.newChangesTestDataMetaValuesAsObject));
  

  }

  updateTestDataAppOneTableOneDetails(event: any, testDataAppOneTableOne:TestDataAppOneTableOne) {

    const updateColumn = event.target.name;
    const updatedValue = event.target.value;
    console.log("Data ID being edited now is.."+testDataAppOneTableOne.testDataId)
    if(this.newChangesTestDataAppOneTableOne.has(testDataAppOneTableOne.testDataId))
    {
      let newObject: any=this.newChangesTestDataAppOneTableOne.get(testDataAppOneTableOne.testDataId);
      newObject[updateColumn as keyof typeof newObject]=updatedValue;

      this.newChangesTestDataAppOneTableOne.set(testDataAppOneTableOne.testDataId,newObject);
    }
    else{
      let newObject: any={"testDataId":testDataAppOneTableOne.testDataId};
      newObject[updateColumn as keyof typeof newObject]=updatedValue;
      this.newChangesTestDataAppOneTableOne.set(testDataAppOneTableOne.testDataId,newObject);
    }

    this.newChangesTestDataAppOneTableOne.forEach((value: any, key: any) => {
      console.log(key, value);
  });
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

  

  deleteSelectedTestData() {
   
    this.dismissModal();
      this.testDataService.deleteTestData(this.testApplicationId, this.selectedTestTableId, this.listOfTestDataSelected)
    
  }

  cloneSelectedTestData() {
    
      this.dismissModal();
      console.log("List of records to be cloned:" +JSON.stringify(this.listOfTestDataSelected))
      this.testDataService.cloneTestData(this.testApplicationId, this.selectedTestTableId, this.listOfTestDataSelected);
     
      if(confirm("Clone Successfull! Do you want to see the cloned records alone?"))
      {
        this.testDataMetaValuesAsObjectList=this.clonedTestDataMetaValuesAsObject;
      }    
  }

  updateRunFlagForSelectedTestData() {
   
    this.dismissModal();
     // this.testDataService.deleteTestData(this.testApplicationId, this.selectedTestTableId, this.listOfTestDataSelected)
    
  }


  unsorted():number
  { 
    return 0;
  }

  myMetaDataTestFieldsSortOrder = (a: any, b: any): number => {

    for (let key in this.testDataMetaAppOneFieldsInfo) {

      if (key === a.key) {
        let value = this.testDataMetaAppOneFieldsInfo[key];
      }
      // Use `key` and `value`
    }
    const a_key = JSON.stringify(a.key);
    const b_key = JSON.stringify(b.key);

    let a_key_found: boolean = false;
    let b_key_found: boolean = false;

    let a_key_order: number = 0;
    let b_key_order: number = 0;

    let returnNum: number = 0;

    this.testDataMetaAppOneFieldsInfo.find(element => {
      if (element.field_name_api === a.key) {
        a_key_found = true;
        a_key_order = +element.field_order;
      }

      if (element.field_name_api === b.key) {
        b_key_found = true;
        b_key_order = +element.field_order;
      }
    })

    if (!a_key_found && !b_key_found) {
      returnNum = 0;
    }
    else if (!a_key_found && b_key_found) {
      returnNum = -1;
    }
    else if (a_key_found && !b_key_found) {
      returnNum = 1;
    }
    else if (a_key_order > b_key_order) {
      returnNum = 1;
    }
    else if (a_key_order < b_key_order) {
      returnNum = -1;
    }

    // console.log("a:" + JSON.stringify(a.key) + " b:" + JSON.stringify(b.key));
    // console.log("a_key_found :" + a_key_found + " b_key_found:" + b_key_found);
    // console.log("a_key_order :" + a_key_order + " b_key_order:" + b_key_order);
    // console.log("Returns: " + returnNum)

    return returnNum;
  }

  myAppDataTestFieldsSortOrder = (a: any, b: any): number => {

    for (let key in this.testDataAppOneTableOneFieldsInfo) {

      if (key === a.key) {
        let value = this.testDataAppOneTableOneFieldsInfo[key];
      }
      // Use `key` and `value`
    }
    const a_key = JSON.stringify(a.key);
    const b_key = JSON.stringify(b.key);

    let a_key_found: boolean = false;
    let b_key_found: boolean = false;

    let a_key_order: number = 0;
    let b_key_order: number = 0;

    let returnNum: number = 0;

    this.testDataAppOneTableOneFieldsInfo.find(element => {
      if (element.field_name_api === a.key) {
        a_key_found = true;
        a_key_order = +element.field_order;
      }

      if (element.field_name_api === b.key) {
        b_key_found = true;
        b_key_order = +element.field_order;
      }
    })

    if (!a_key_found && !b_key_found) {
      returnNum = 0;
    }
    else if (!a_key_found && b_key_found) {
      returnNum = -1;
    }
    else if (a_key_found && !b_key_found) {
      returnNum = 1;
    }
    else if (a_key_order > b_key_order) {
      returnNum = 1;
    }
    else if (a_key_order < b_key_order) {
      returnNum = -1;
    }

    // console.log("a:" + JSON.stringify(a.key) + " b:" + JSON.stringify(b.key));
    // console.log("a_key_found :" + a_key_found + " b_key_found:" + b_key_found);
    // console.log("a_key_order :" + a_key_order + " b_key_order:" + b_key_order);
    // console.log("Returns: " + returnNum)

    return returnNum;
  }


  getTestData(testDataMeta: TestDataMeta):TestDataAppOneTableOne[]
  {
    console.log(testDataMeta.testDataAppOneTableOne);
    return testDataMeta.testDataAppOneTableOne;
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

  openModal(content:any) {
    this.ngbModalService.open(content);
  }

  dismissModal()
  {
    this.ngbModalService.dismiss();
  }

  downloadTestDataTemplate()
  {
    this.dismissModal()
  }

  exportTestDataSearchResults()
  {
    this.dismissModal()
    this.testDataService.downloadTestDataExcel(this.testApplicationId, this.selectedTestTableId);
  }

  getTestDataPage()
  {
    this.testDataService.fetchTestDataMetaFromBackend(this.testApplicationId, this.selectedTestTableId , this.testDataSearchedCriteria, this.currentPage+1, this.numOfRecordsToShowInAPage, 'testDataMetaId');
  }

  fetchPreviousPageTestData()
  {
    this.testDataService.fetchTestDataMetaFromBackend(this.testApplicationId, this.selectedTestTableId , this.testDataSearchedCriteria, this.currentPage-2, this.numOfRecordsToShowInAPage, 'testDataMetaId');
  }

  fetchNextPageTestData()
  {
    console.log("Current Page:"+this.currentPage);
    this.testDataService.fetchTestDataMetaFromBackend(this.testApplicationId, this.selectedTestTableId , this.testDataSearchedCriteria, this.currentPage, this.numOfRecordsToShowInAPage, 'testDataMetaId');
  }
}