import { Component, Input, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MyTestExecutionSummaryService } from '../my-test-execution-summary-service';
import { TestExecutionResults } from './my-test-execution-results';

@Component({
  selector: 'app-my-test-execution-results',
  templateUrl: './my-test-execution-results.component.html',
  styleUrls: ['./my-test-execution-results.component.css']
})
export class MyTestExecutionResultsComponent implements OnInit {

  constructor(private testExecutionSummaryService:MyTestExecutionSummaryService) { }

  @Input()
  listOfTestExecutionResultsReceived: TestExecutionResults[] = [];

  @Input()
  dataCollectionSize:number=0;

  page = 1;
  pageSize = 10;
 
  selectColumnsDropdownSettings: IDropdownSettings = {};

 // listOfTestExecutionResults:TestExecutionResults[]=[]
  editableTestExecutionResults: TestExecutionResults| undefined;
  testExecutionResultsDetailsUpdate:Map<String,Map<String,String>>=new Map<String, Map<String,String>>();
  listOfTestExecutionResultsSelected:TestExecutionResults[]=[];

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


  onDelete(event: any, testExecutionResults: TestExecutionResults)
  {
    if(confirm('Are you sure? Do you want to delete this row '+testExecutionResults.testExecutionId+' ?'))
    {
      alert('Deleted successfully!');
    }
  }

  onEdit(event: any, testExecutionResults: TestExecutionResults) {
    this.editableTestExecutionResults = testExecutionResults;
  }

  onCancel(event: any, testExecutionResults: TestExecutionResults) {
    if(this.testExecutionResultsDetailsUpdate.has(testExecutionResults.testExecutionId))
    {
      if(confirm('Are you sure? Do you want to cancel the changes made for this row?'))
      {
       this.testExecutionResultsDetailsUpdate.clear();    
        
       }
     }
     this.editableTestExecutionResults = undefined;
  }

  onUpdate(testExecutionResults:TestExecutionResults) {

    if(this.testExecutionResultsDetailsUpdate.has(testExecutionResults.testExecutionId))
    {
      for (let [key, value] of this.testExecutionResultsDetailsUpdate) {
        console.log(key, value); 
        alert("Updated Successfully!")       
    }
    }
    else{
      alert("No changes were found!")
    }
  // this.enableEditAndDelete(event, testScriptId, testScript);
}

updateExistingTestExecutionResultsFieldDetails(event: any, testExecutionResults: TestExecutionResults) {

  console.log(this.testExecutionResultsDetailsUpdate.get(testExecutionResults.testExecutionId));
  const updateColumn = event.target.name;
  const updatedValue = event.target.value;

  console.log(updateColumn + ' Updated Value:' + updatedValue);
  const updateData = new Map<string, string>();
  updateData.set(updateColumn, updatedValue);

  if (this.testExecutionResultsDetailsUpdate.has(testExecutionResults.testExecutionId)) {
    const existingStoredData = this.testExecutionResultsDetailsUpdate.get(testExecutionResults.testExecutionId);
    existingStoredData?.set(updateColumn, updatedValue);
  }
  else {
    this.testExecutionResultsDetailsUpdate.set(testExecutionResults.testExecutionId, updateData);
  }
}

  eventCheck(event: any, TestExecutionResults: TestExecutionResults) {
    if (event.target.checked) {
      this.listOfTestExecutionResultsSelected.push(TestExecutionResults);
      console.log(this.listOfTestExecutionResultsSelected);
    }
    else {
      this.listOfTestExecutionResultsSelected.forEach((elementInArray, indexOdElementInArray) => {
        if (elementInArray == TestExecutionResults) {
          this.listOfTestExecutionResultsSelected.splice(indexOdElementInArray, 1);
          console.log(this.listOfTestExecutionResultsSelected);
        }
      });

    }
  }

  getColumnValue(testExecutionResults:TestExecutionResults)
  {

  }

  headers(testExecutionResults:TestExecutionResults)
  {
    const columnMapping=new Map(Object.entries(testExecutionResults));
    return columnMapping.keys();
  }
  columns(testExecutionResults:TestExecutionResults):Map<String, String>
  {
    const columnMapping:Map<String,String>=new Map(Object.entries(testExecutionResults));
    console.log(columnMapping);
    return columnMapping;
  }

  pageChange()
  {
    
  }

}
