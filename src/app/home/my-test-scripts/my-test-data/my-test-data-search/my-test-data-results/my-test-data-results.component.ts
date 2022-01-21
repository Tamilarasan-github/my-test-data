import { Component, Input, OnInit } from '@angular/core';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MyTestDataService } from '../../my-test-data.service';
import { TestData } from './my-test-data';

@Component({
  selector: 'app-my-test-data-results',
  templateUrl: './my-test-data-results.component.html',
  styleUrls: ['./my-test-data-results.component.css']
})
export class MyTestDataResultsComponent implements OnInit {

  constructor(private testDataService:MyTestDataService) { }

  @Input()
  listOfTestDataReceived: TestData[] = [];

  @Input()
  dataCollectionSize:number=0;

  page = 1;
  pageSize = 10;
 
  selectColumnsDropdownSettings: IDropdownSettings = {};

 // listOfTestData:TestData[]=[]
  editableTestData: TestData| undefined;
  testDataDetailsUpdate:Map<String,Map<String,String>>=new Map<String, Map<String,String>>();
  listOfTestDataSelected:TestData[]=[];

  columnsDropdownList: string[] = [];
  filteredColumnsDropdownList: string[] = [];
  columnsSelectedList: string[] = [];

  enableColumnDropdown: boolean = false;
  enableExportDropdown: boolean = false;

  ngOnInit(): void {
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

    this.columnsDropdownList = [
      'Column 1',
      'Column 2',
      'Column 3',
      'Column 4',
      'Column 5',
      'Column 6',
      'Column 7',
      'Column 8',
      'Column 9',
      'Column 10',
    ];

    this.columnsSelectedList = [
      'Column 1',
      'Column 2',
      'Column 3',
      'Column 4',
      'Column 5'
    ];

   this.filteredColumnsDropdownList=this.columnsDropdownList;
  }

  onSelectAll(event: any) {

  }

  onItemSelect(event: any) {

  }

  showColumnDropdown(event:any) {
    console.log(event)
    this.enableColumnDropdown = true;
  }

  hideColumnDropdown(event:any) {
    console.log(event)
    this.enableColumnDropdown = false;
  }

  updateColumnsVisible(event: any, column: string) {
    if (event.target.checked === false) {

      const index = this.columnsSelectedList.indexOf(column);
     
      if (index !== -1) {
        this.columnsSelectedList.splice(index, 1);
        console.log('Removed Index : ' + index + ' Column: '+column);
      }
    }
    else  if (event.target.checked === true)
    {
      this.columnsSelectedList.push(column);
      console.log('Added : ' + column);
    }
  }

  searchColumnsInDropdown(event:any)
  {
    const expectedValue:string=event.target.value;
    console.log('Typed Char is '+expectedValue);

    const columnFilteredSearchResults:string[]=[];

    this.columnsDropdownList.forEach((value)=>
    {
      console.log('Loop current value is ' +value);
     if(value.includes(expectedValue))
      {
        columnFilteredSearchResults.push(value);
      }
    });
    console.log(columnFilteredSearchResults);
    this.filteredColumnsDropdownList=columnFilteredSearchResults;
  }

  showExportOptions()
  {
    this.enableExportDropdown=!this.enableExportDropdown;
  }


  onDelete(event: any, testData: TestData)
  {
    if(confirm('Are you sure? Do you want to delete this row '+testData.testDataId+' ?'))
    {
      alert('Deleted successfully!');
    }
  }

  onEdit(event: any, testData: TestData) {
    this.editableTestData = testData;
  }

  onCancel(event: any, testData: TestData) {
    if(this.testDataDetailsUpdate.has(testData.testDataId))
    {
      if(confirm('Are you sure? Do you want to cancel the changes made for this row?'))
      {
       this.testDataDetailsUpdate.clear();    
        
       }
     }
     this.editableTestData = undefined;
  }

  onUpdate(testData:TestData) {

    if(this.testDataDetailsUpdate.has(testData.testDataId))
    {
      for (let [key, value] of this.testDataDetailsUpdate) {
        console.log(key, value); 
        alert("Updated Successfully!")       
    }
    }
    else{
      alert("No changes were found!")
    }
  // this.enableEditAndDelete(event, testScriptId, testScript);
}

updateExistingTestDataFieldDetails(event: any, testData: TestData) {

  console.log(this.testDataDetailsUpdate.get(testData.testDataId));
  const updateColumn = event.target.name;
  const updatedValue = event.target.value;

  console.log(updateColumn + ' Updated Value:' + updatedValue);
  const updateData = new Map<string, string>();
  updateData.set(updateColumn, updatedValue);

  if (this.testDataDetailsUpdate.has(testData.testDataId)) {
    const existingStoredData = this.testDataDetailsUpdate.get(testData.testDataId);
    existingStoredData?.set(updateColumn, updatedValue);
  }
  else {
    this.testDataDetailsUpdate.set(testData.testDataId, updateData);
  }
}

  eventCheck(event: any, TestData: TestData) {
    if (event.target.checked) {
      this.listOfTestDataSelected.push(TestData);
      console.log(this.listOfTestDataSelected);
    }
    else {
      this.listOfTestDataSelected.forEach((elementInArray, indexOdElementInArray) => {
        if (elementInArray == TestData) {
          this.listOfTestDataSelected.splice(indexOdElementInArray, 1);
          console.log(this.listOfTestDataSelected);
        }
      });

    }
  }

  getColumnValue(testData:TestData)
  {

  }

  headers(testData:TestData)
  {
    const columnMapping=new Map(Object.entries(testData));
    return columnMapping.keys();
  }
  columns(testData:TestData):Map<String, String>
  {
    const columnMapping:Map<String,String>=new Map(Object.entries(testData));
    console.log(columnMapping);
    return columnMapping;
  }

  pageChange()
  {
    
  }

  deleteSelectedTestData()
  {
    if(confirm("Are you sure do you want to delete the selected test data?"))
    {
      alert("Selected test data deleted successfully!")
    }
  }

  cloneSelectedTestData()
  {
    if(confirm("Are you sure do you want to clone the selected test data?"))
    {
      alert("Selected test data cloned successfully!")
    }
  }

}
