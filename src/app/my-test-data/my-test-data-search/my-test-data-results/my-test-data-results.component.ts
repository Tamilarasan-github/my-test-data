import { Component, OnInit } from '@angular/core';

import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-my-test-data-results',
  templateUrl: './my-test-data-results.component.html',
  styleUrls: ['./my-test-data-results.component.css']
})
export class MyTestDataResultsComponent implements OnInit {

  constructor() { }

  selectColumnsDropdownSettings: IDropdownSettings = {};

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

}
