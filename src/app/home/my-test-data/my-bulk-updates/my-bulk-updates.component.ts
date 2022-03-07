import { KeyValuePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TestDataService } from '../my-test-data.service';
import { Conditions } from './my-conditions';
import { ConditionsConnector } from './my-conditions-connector';
import { SearchCriteria } from './my-search-criteria';
import { SubConditionsConnector } from './my-sub-conditions-connector';

@Component({
  selector: 'app-my-bulk-updates',
  templateUrl: './my-bulk-updates.component.html',
  styleUrls: ['./my-bulk-updates.component.css']
})
export class MyBulkUpdatesComponent implements OnInit {

  fields: Map<string, string>;

  constructor(private testDataService: TestDataService) { 

    this.fields=new Map<string, string>();
    this.testDataService.testFieldsAsObservable.subscribe(
      {
        next:(v)=> this.fields=v
      }
    )
  }

  field_names: string[] = [];
  operators: string[] = ['EQUALS TO', 'STARTS WITH', 'ENDS WITH', 'CONTAINS'];
  connectors: string[] = ['OR', 'AND', 'END'];

 
  conditionsConnector:ConditionsConnector=new ConditionsConnector();
  conditionIndex: number =0;
  conditions: Conditions=new Conditions();

  removedCondition:number[]=[];

  tempSelected: string[] = [];

  fieldNameToBeUpdated:string="";
  fieldValueToBeUpdated:string="";

  showBulkUpdate: boolean = true;
  bulkUpdateConditions: Map<number, Map<number, Map<string, string>>>=new  Map<number, Map<number, Map<string, string>>>();
  
  subConditionsConnectorMap: Map<number, SubConditionsConnector>= new Map<number, SubConditionsConnector>();
    

  singleSelectionDropdownSettings: IDropdownSettings = {};

  ngOnInit(): void {

    this.singleSelectionDropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      clearSearchFilter: true,
    };
    
  }


  showBulkUpdateContainer() {
    this.showBulkUpdate = !this.showBulkUpdate;
  }

  addBulkUpdateCondition() {
    this.conditionIndex=this.conditionIndex+1;

    const conditionsConnector: ConditionsConnector=new ConditionsConnector();
    conditionsConnector.$conditionIndex=this.conditions.$conditionsConnector.length+1;
    console.log("New ConnectionConnector Index Num:"+conditionsConnector.$conditionIndex);

    const subConditionsConnector:SubConditionsConnector=new SubConditionsConnector();

    const searchCriteria:SearchCriteria=new SearchCriteria();
     subConditionsConnector.$subConditionIndex=1;
     subConditionsConnector.$searchCriteria=searchCriteria;
     conditionsConnector.$subConditionsConnector.push(subConditionsConnector);


     this.conditions.$conditionsConnector.push(conditionsConnector);

     console.log("Conditions: "+JSON.stringify(this.conditions));
  
  }

  addBulkUpdateSubCondition(conditionNumber:number) {
    this.conditions.$conditionsConnector.find(conditionsConnector =>
    {
      const condIndex= conditionsConnector.$conditionIndex;
      if(conditionNumber===condIndex)
      {
        const subConditionCount = conditionsConnector.$subConditionsConnector.length;

        const subConditionsConnector:SubConditionsConnector=new SubConditionsConnector();

        const searchCriteria:SearchCriteria=new SearchCriteria();
         subConditionsConnector.$subConditionIndex=subConditionCount+1;
         subConditionsConnector.$searchCriteria=searchCriteria;
         conditionsConnector.$subConditionsConnector.push(subConditionsConnector);
    
      }
    })

    console.log("Conditions: "+JSON.stringify(this.conditions));     
  }

  removeBulkUpdateSubCondition(conditionNumber:number, subConditionNum:number)
  {
    let subConditions: Map<number, Map<string, string>>=this.bulkUpdateConditions.get(conditionNumber)!;
    let size: number = subConditions.size;

    subConditions.delete(subConditionNum);

    this.bulkUpdateConditions.set(conditionNumber, subConditions);   
  }

  removeBulkUpdateCondition(conditionNum:number) {
    
    this.bulkUpdateConditions.delete(conditionNum);
  }

  onFieldnameSelectSubCondition(event:any, conditionNumber:number, subConditionNumber:number)
  {
    console.log("Condition no. "+conditionNumber+" & SubCondition No."+subConditionNumber+" New Field Name:"+event.target.value);

    console.log("Conditions: "+JSON.stringify(this.conditions));
  }

  onOperatorSelectSubCondition(event:any, conditionNumber:number, subConditionNumber:number)
  {
    console.log("Condition no. "+conditionNumber+" & SubCondition No."+subConditionNumber+" New Operator Name:"+event.target.value);
    console.log("Conditions: "+JSON.stringify(this.conditions));
  }

  onValueEnteredSubCondition(event:any, conditionNumber:number, subConditionNumber:number)
  {
    console.log("Conditions: "+JSON.stringify(this.conditions));
  }

  onConnectorSelectSubCondition(event:any, conditionNumber:number,  subConditionNumber:number)
  {
    console.log("Conditions: "+JSON.stringify(this.conditions));
  }

  onConnectorSelectCondition(event:any, conditionNumber:number)
  {
    console.log("Conditions: "+JSON.stringify(this.conditions));
  }


  counter(i: number) {
    return new Array(i);
  }

  getSubConditionsCount(conditionNumber:number)
  {
    let count=this.bulkUpdateConditions.get(conditionNumber);
    return new Array(count);
  }

  onBulkUpdate()
  {
   
  }

  onSearch()
  {
    
  }

  clearBulkUpdateConditions()
  {
    if(confirm('Are you sure, do you want to clear?'))
    {
      this.bulkUpdateConditions=new  Map<number, Map<number, Map<string, string>>>()
    }
    
  }
}
