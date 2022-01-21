import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Event } from '@angular/router';
import { NewGroup } from './my-new-group';
import { TestScriptGroups } from './my-test-script-groups';
import { MyTestScriptService } from './my-test-script-service';
import { TestScriptData } from './test-script-data';

@Component({
  selector: 'app-my-test-scripts',
  templateUrl: './my-test-scripts.component.html',
  styleUrls: ['./my-test-scripts.component.css']
})
export class MyTestScriptsComponent implements OnInit {

  dropdownSettings = {};
  dropdownSingleSelectionSettings = {};

  showLoadGroupFields: boolean = true;
  showCreateGroupFields: boolean = false;
  showUpdateGroupFields: boolean = false;
  showTestScriptsTable: boolean = false;

  groupSelected: string[] = [];

  editableTestScript: TestScriptData | undefined;
  showAddTestscript: boolean = false;
  testScriptsList: TestScriptData[] = [];
  previousTestScriptsList: TestScriptData[] = [];

  listOfTestScriptsToSelected: TestScriptData[] = [];
  testScriptDetailsUpdate: Map<number, Map<String, String>> = new Map<number, Map<String, String>>();
  testScriptDetailsBackup: Map<number, Map<String, String>> = new Map<number, Map<String, String>>();


  @ViewChild('newTestScriptName')
  newTestScriptName!: ElementRef<HTMLInputElement>;
  @ViewChild('newTestScriptDescription')
  newTestScriptDescription!: ElementRef<HTMLInputElement>;


  groupsList: String[] = [];

  constructor(private testScriptService: MyTestScriptService) {

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

    this.groupsList = this.testScriptService.fetchTestScriptGroups()['groupName']
  }

  onDelete(event: any, testScript: TestScriptData)
  {
    if(confirm('Are you sure? Do you want to delete this row '+testScript.testScriptId+' ?'))
    {
      alert('Deleted successfully!');
    }
  }

  onEdit(event: any, testScript: TestScriptData) {
    this.editableTestScript = testScript;
  }

  onCancel(event: any, testScript: TestScriptData) {
    if(this.testScriptDetailsUpdate.has(testScript.testScriptId))
    {
      if(confirm('Are you sure? Do you want to cancel the changes made for this row?'))
      {
       this.testScriptDetailsUpdate.clear();    
        
       }
     }
     this.editableTestScript = undefined;
  }

  eventCheck(event: any, testScriptData: TestScriptData) {
    if (event.target.checked) {
      this.listOfTestScriptsToSelected.push(testScriptData);
      console.log(this.listOfTestScriptsToSelected);
    }
    else {
      this.listOfTestScriptsToSelected.forEach((elementInArray, indexOdElementInArray) => {
        if (elementInArray == testScriptData) {
          this.listOfTestScriptsToSelected.splice(indexOdElementInArray, 1);
          console.log(this.listOfTestScriptsToSelected);
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

  onUpdate(testScript:TestScriptData) {

      if(this.testScriptDetailsUpdate.has(testScript.testScriptId))
      {
        for (let [key, value] of this.testScriptDetailsUpdate) {
          console.log(key, value);        
      }
      }
      else{
        alert("No changes were found!")
      }
    // this.enableEditAndDelete(event, testScriptId, testScript);
  }


  updateExistingTestscriptFieldDetails(event: any, testScriptData: TestScriptData) {

    console.log(this.testScriptDetailsUpdate.get(testScriptData.testScriptId));
    const updateColumn = event.target.name;
    const updatedValue = event.target.value;

    console.log(updateColumn + ' Updated Value:' + updatedValue);
    const updateData = new Map<string, string>();
    updateData.set(updateColumn, updatedValue);

    if (this.testScriptDetailsUpdate.has(testScriptData.testScriptId)) {
      const existingStoredData = this.testScriptDetailsUpdate.get(testScriptData.testScriptId);
      existingStoredData?.set(updateColumn, updatedValue);
    }
    else {
      this.testScriptDetailsUpdate.set(testScriptData.testScriptId, updateData);
    }
  }

  showLoadGroup() {
    this.showLoadGroupFields = !this.showLoadGroupFields;
  }

  showCreateGroup() {
    this.showCreateGroupFields = !this.showCreateGroupFields;
  }

  showUpdateGroup() {
    this.showUpdateGroupFields = !this.showUpdateGroupFields;
  }

  showTestScriptsGrid() {
    this.showTestScriptsTable = !this.showTestScriptsTable;
  }


  loadGroup() {
    this.testScriptsList = this.testScriptService.fetchTestScripts();
    this.previousTestScriptsList = this.testScriptsList;

    console.log(this.testScriptsList);
    this.showTestScriptsTable = true;
  }

  createGroup() {

    console.log(JSON.stringify(new NewGroup('New Group', this.listOfTestScriptsToSelected)));
  }

  updateGroup() {
    if (this.groupSelected.length > 1) {
      alert("More than one group is loaded, please select one group name in drop down to update!");
    }
    else {
      if (confirm("Are you sure do you want to update the test scripts part of the selected group?")) {
        console.log(new NewGroup('UpdateGroupNameHere', this.listOfTestScriptsToSelected));
      }
    }
  }

  executeTestScripts() {
    console.log(JSON.stringify(this.listOfTestScriptsToSelected));
  }
}




