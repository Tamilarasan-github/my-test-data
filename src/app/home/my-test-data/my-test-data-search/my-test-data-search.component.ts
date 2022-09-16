import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TestDataService } from '../my-test-data.service';
import { TestDataMeta } from '../my-test-data-results/my-test-data-meta';
import { TestDataSearchCriteria } from './my-test-data-search-criteria';
import { TestDataMetaDropdownValues } from './my-test-data-meta-dropdown-values';
import { ApplicationTableInfoService } from '../../my-header/my-application-table-info-service';


@Component({
  selector: 'app-my-test-data-search',
  templateUrl: './my-test-data-search.component.html',
  styleUrls: ['./my-test-data-search.component.css']
})
export class MyTestDataSearchComponent implements OnInit {

  // @Output() 
  // listOfTestDataSearchResults= new EventEmitter<TestDataMeta[]>();
  
  testDataMetaDropdownValues!: TestDataMetaDropdownValues;

  showSearch: boolean = true;
 
  searchDropdownSettings: IDropdownSettings = {};
  tableSelectionDropdownSettings: IDropdownSettings = {};

  testDataMetaIdDropdownList: number[] = [];
  testDataMetaIdSelectedList: number[]= [];

  selectedTestTableId: number=0;

  testTablesDropdownList: any[] = [];
  testTablesSelectedList: number[] = [];

  testCaseIdDropdownList: any[] = [];
  testCaseIdSelectedList: any = [];

  jiraIdDropdownList: any[] = [];
  jiraIdSelectedList: any = [];

  testRunFlagDropdownList: any[] = [];
  testRunFlagSelectedList: any = [];

  testScriptNamesDropdownList: any[] = [];
  testScriptNamesSelectedList: any = [];

  testDataShortDescriptionDropdownList: any[] = [];
  testDataShortDescriptionSelectedList: any = [];

  testDataCategoryDropdownList: any[] = [];
  testDataCategorySelectedList: any = [];

  testDataPriorityDropdownList: any[] = [];
  testDataPrioritySelectedList: any = [];

  testDataCreatedByDropdownList: any[] = [];
  testDataCreatedBySelectedList: any = [];

  testDataCreatedDateFrom: Date = new Date('2000-01-01');
  testDataCreatedDateTo: Date = new Date('2999-01-01'); 

  testDataUpdatedByDropdownList: any[] = [];
  testDataUpdatedBySelectedList: any = [];

  testDataUpdatedDateFrom: any = new Date('2000-01-01'); 
  testDataUpdatedDateTo: any = new Date('2999-01-01'); 


  constructor(private testDataService: TestDataService, 
    private applicationTableInfoService:ApplicationTableInfoService) 
  {
    console.log("TestDataSearch Constructor triggered!!!!");

    this.testDataService.tableListAsObservable.subscribe(
      {
        next:(value) =>{
          let tableList: any[]=[];
          value.forEach(element=>
            {
              let obj={ item_id: element.tableId, item_text: element.tableName }
              tableList.push(obj);
           
            })
            this.testTablesDropdownList=tableList;
         // console.log("Test Table List: "+JSON.stringify(this.testTablesDropdownList));
        }
      }
    )

    this.testDataService.tableSelectedAsObservable.subscribe(
      {
        next:(value) =>{
        this.selectedTestTableId=value
        }
      })

    this.testDataService.testDataMetaDropdownValuesAsObservable.subscribe(
      {
        next:(value)=>
        {
          this.setDropdownValues(value);
        }
      }
    )
  }


  ngOnInit(): void {
    //console.log("TestDataSearch ngOnInit() triggered!!!")

    this.searchDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      clearSearchFilter: true,
    };

    this.tableSelectionDropdownSettings = {
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

  // ngOnChanges()
  // {
  //   console.log("TestDataSearch ngOnChanges() triggered!!!!");
  // }
  ngDoCheck()
  {
    
  }
  // ngAfterContentInit()
  // {
  //   console.log("TestDataSearch ngAfterContentInit() triggered!!!!")
  // }
  // ngAfterContentChecked()
  // {
  //   console.log("TestDataSearch ngAfterContentChecked() triggered!!!!")
  // }
  // ngAfterViewInit()
  // {
  //   console.log("TestDataSearch ngAfterViewInit() triggered!!!!")
  // }
  // ngAfterViewChecked()
  // {
  //   console.log("TestDataSearch ngAfterViewChecked() triggered!!!!")
  // }
  // ngOnDestroy()
  // {
  //   console.log("TestDataSearch ngOnDestroy() triggered!!!!")
  // }
  
  onTableSelection(event: any)
  {
    let tableIdSelected: number=event.item_id;
    
    console.log("Table Selected:"+event.item_id)
    this.testTablesSelectedList=[tableIdSelected];
    this.testDataService.setTable(tableIdSelected);  
   
  }

  onTableDeSelection(event: any)
  {
    let tableIdSelected: number=event.item_id;
    
    console.log("Table DeSelected:"+event.item_id)
    this.setDropdownValues(new TestDataMetaDropdownValues());
   
  }

  
  
  setDropdownValues(newValues: TestDataMetaDropdownValues)
  {
    //console.log("Setting drop down values in component" +JSON.stringify(newValues));
          this.testDataMetaIdDropdownList = newValues.testDataMetaId!;
          this.testCaseIdDropdownList = newValues.testCaseId!;
          this.testScriptNamesDropdownList = newValues.testScriptName!;
          this.testDataShortDescriptionDropdownList = newValues.testShortDescription!;
          this.testDataCategoryDropdownList = newValues.testCategory!;
          this.testDataPriorityDropdownList=newValues.testPriority!;
          this.jiraIdDropdownList = newValues.jiraId!;
          this.testRunFlagDropdownList = newValues.runFlag!;
          this.testDataCreatedByDropdownList = newValues.createdBy!;
          this.testDataUpdatedByDropdownList = newValues.updatedBy!;
  }

  onItemSelect(event: any) {
   // console.log('Dropdown Item Select Event: ' + event);
  }

  onSelectAll(event: any) {
   // console.log('Dropdown Select All Event: ' + event);
  }

  showSeachContainer() {
    this.showSearch = !this.showSearch;
  }

  
  fetchTestData() {
    const applicationId=this.applicationTableInfoService.getSeletedApplication();

    const testDataSearchCriteria: TestDataSearchCriteria= new TestDataSearchCriteria(
      this.testDataMetaIdSelectedList, 
      this.testCaseIdSelectedList,
      this.jiraIdSelectedList,
      this.testRunFlagSelectedList, 
      this.testScriptNamesSelectedList,
      this.testDataShortDescriptionSelectedList,
      this.testDataPrioritySelectedList,
      this.testDataCategorySelectedList,
      this.testDataCreatedBySelectedList,
      this.testDataCreatedDateFrom,
      this.testDataCreatedDateTo,
      this.testDataUpdatedBySelectedList,
      this.testDataUpdatedDateFrom,
      this.testDataUpdatedDateTo);

     
    console.log('Test data request : ' + JSON.stringify(testDataSearchCriteria));
    this.testDataService.fetchTestDataMetaFromBackend(applicationId, this.selectedTestTableId, testDataSearchCriteria, 0, 10, 'testDataMetaId');
    
  //  console.log(this.listOfTestDataSearchResults)
  }

  clearSearch() {

    this.testDataMetaIdSelectedList = [];
    this.testScriptNamesSelectedList = [];
    this.testDataShortDescriptionSelectedList = [];
    this.testDataCategorySelectedList = [];
    this.jiraIdSelectedList = [];
    this.testRunFlagSelectedList = [];
    this.testDataCreatedBySelectedList = [];
    this.testDataUpdatedBySelectedList = [];

  }

  showStats() {

  }

}
