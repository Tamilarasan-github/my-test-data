import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ApiHttpService } from "src/app/api-http-service";
import { environment } from "src/environments/environment";
import { ApplicationTableInfoService } from "../my-header/my-application-table-info-service";
import { TestTableInfo } from "../my-header/my-test-tables-info";
import { TestDataMeta } from "./my-test-data-results/my-test-data-meta";
import { TestDataMetaDropdownValues } from "./my-test-data-search/my-test-data-meta-dropdown-values";
import { TestDataSearchCriteria } from "./my-test-data-search/my-test-data-search-criteria";
import { TestFieldsInfo } from "./my-test-fields-info";


@Injectable()
export class TestDataService {

  private applicationSelectedId: number;

  private tableListBehaviorSub: BehaviorSubject<TestTableInfo[]>;
  public tableListAsObservable: Observable<TestTableInfo[]>;

  private tableSelectedBehaviorSub : BehaviorSubject<number>;
  public tableSelectedAsObservable: Observable<number>;

  // private testDataSearchCriteriaBehaviorSub : BehaviorSubject<TestDataSearchCriteria>;
  // public testDataSearchCriteriaAsObservable: Observable<TestDataSearchCriteria>;

  private testDataMetaAppOneFieldsInfoBehaviorSub : BehaviorSubject<TestFieldsInfo[]>;
  public testDataMetaAppOneFieldsInfoAsObservable: Observable<TestFieldsInfo[]>;

  private testDataAppOneTableOneFieldsInfoBehaviorSub : BehaviorSubject<TestFieldsInfo[]>;
  public testDataAppOneTableOneFieldsInfoAsObservable: Observable<TestFieldsInfo[]>;

  private testDataAppOneTableTwoFieldsInfoBehaviorSub : BehaviorSubject<TestFieldsInfo[]>;
  public testDataAppOneTableTwoFieldsInfoAsObservable: Observable<TestFieldsInfo[]>;

 private testDataMetaDropdownValuesBehaviorSub: BehaviorSubject<TestDataMetaDropdownValues>;
 public testDataMetaDropdownValuesAsObservable: Observable<TestDataMetaDropdownValues>;

 private testDataMetaValuesBehaviorSub: BehaviorSubject<TestDataMeta[]>;
 public testDataMetaValuesAsObservable: Observable<TestDataMeta[]>;

 private clonedTestDataMetaValuesBehaviorSub: BehaviorSubject<TestDataMeta[]>;
 public clonedTestDataMetaValuesAsObservable: Observable<TestDataMeta[]>;

 private testFieldsBehaviorSub: BehaviorSubject<Map<string, string>>;
 public testFieldsAsObservable: Observable<Map<string, string>>;

 private testFieldOrderBehaviorSub: BehaviorSubject<Map<string, number>>;
 public testFieldOrderAsObservable: Observable<Map<string, number>>;

  constructor(private httpClient: HttpClient, private applicationTableInfoService:ApplicationTableInfoService)
  {
    this.applicationSelectedId=0;

    this.tableListBehaviorSub = new BehaviorSubject<TestTableInfo[]>([]);
    this.tableListAsObservable = this.tableListBehaviorSub.asObservable();

    this.tableSelectedBehaviorSub = new BehaviorSubject<number>(0);
    this.tableSelectedAsObservable = this.tableSelectedBehaviorSub.asObservable();

    // this.testDataSearchCriteriaBehaviorSub = new BehaviorSubject<TestDataSearchCriteria>(0);
    // this.testDataSearchCriteriaAsObservable = this.testDataSearchCriteriaBehaviorSub.asObservable();

    this.testDataMetaAppOneFieldsInfoBehaviorSub = new BehaviorSubject<TestFieldsInfo[]>([]);
    this.testDataMetaAppOneFieldsInfoAsObservable = this.testDataMetaAppOneFieldsInfoBehaviorSub.asObservable();

    this.testDataAppOneTableOneFieldsInfoBehaviorSub = new BehaviorSubject<TestFieldsInfo[]>([]);
    this.testDataAppOneTableOneFieldsInfoAsObservable = this.testDataAppOneTableOneFieldsInfoBehaviorSub.asObservable();

    this.testDataAppOneTableTwoFieldsInfoBehaviorSub = new BehaviorSubject<TestFieldsInfo[]>([]);
    this.testDataAppOneTableTwoFieldsInfoAsObservable = this.testDataAppOneTableTwoFieldsInfoBehaviorSub.asObservable();
    
    this.testDataMetaDropdownValuesBehaviorSub=new BehaviorSubject<TestDataMetaDropdownValues>(new TestDataMetaDropdownValues());
    this.testDataMetaDropdownValuesAsObservable=this.testDataMetaDropdownValuesBehaviorSub.asObservable();
    
    this.testDataMetaValuesBehaviorSub=new BehaviorSubject<TestDataMeta[]>([]);
    this.testDataMetaValuesAsObservable=this.testDataMetaValuesBehaviorSub.asObservable();

    this.clonedTestDataMetaValuesBehaviorSub=new BehaviorSubject<TestDataMeta[]>([]);
    this.clonedTestDataMetaValuesAsObservable=this.clonedTestDataMetaValuesBehaviorSub.asObservable();

    this.testFieldsBehaviorSub=new BehaviorSubject<Map<string, string>>(new Map);
    this.testFieldsAsObservable=this.testFieldsBehaviorSub.asObservable();

    this.testFieldOrderBehaviorSub=new BehaviorSubject<Map<string, number>>(new Map);
    this.testFieldOrderAsObservable=this.testFieldOrderBehaviorSub.asObservable();

    this.applicationTableInfoService.applicationSelectedAsObservable.subscribe(
      {
        next:(value)=>
        {
          this.applicationSelectedId=value;
          this.retrieveTablesList(value);
        }
      }
    )
  }


  retrieveTablesList(applicationId:number)
  {
    const headers={'content-type':'application/json'}
  
    return this.httpClient.get<TestTableInfo[]>(environment.backendBaseURL+"/applications/"+applicationId+"/tables", {'headers':headers})
    .subscribe(
      {
        next : (responseBody) => {
          this.tableListBehaviorSub.next(responseBody);
          
        },
        error :(e)=> {
            console.log("Tables fetching error:"+e);
            console.error()
        }
       
      }
    )
}

  setTable(selectedTableId: number)
  {
    this.tableSelectedBehaviorSub.next(selectedTableId);
    this.getTestDataAppOneFieldsInfo();
    this.getTestDataAppOneTableOneFieldsInfo();
    this.getTestDataAppOneTableTwoFieldsInfo();
    this.fetchDropdownValuesFromBackEnd(this.applicationSelectedId, selectedTableId)
  }

  getTestDataAppOneFieldsInfo()
  {
    const metaDataAppOneTableID=2000;
     
    let testFieldsInfo:TestFieldsInfo[]=[];
    const headers={'content-type':'application/json'}
    this.httpClient.get<TestFieldsInfo[]>(environment.backendBaseURL+"/fields/tables/"+metaDataAppOneTableID,{'headers':headers}).subscribe(
      {
        next:(value)=> this.testDataMetaAppOneFieldsInfoBehaviorSub.next(value)
      }
    ); 
  }

  getTestDataAppOneTableOneFieldsInfo()
  {
    const testDataAppOneTableOneId=2001;
    this.getTestFieldsInfo(testDataAppOneTableOneId).subscribe(
      {
        next:(value)=> {
          this.testDataAppOneTableOneFieldsInfoBehaviorSub.next(value)
          console.log("Fetched Fields Table 1: "+JSON.stringify(value))
        }
      }
    );
  }

  getTestDataAppOneTableTwoFieldsInfo()
  {
    const testDataAppOneTableTwoId=2002;
    this.getTestFieldsInfo(testDataAppOneTableTwoId).subscribe(
      {
        next:(value)=> {
          this.testDataAppOneTableTwoFieldsInfoBehaviorSub.next(value)
          console.log("Fetched Fields Table 2: "+JSON.stringify(value))
        }
      }
    );
  }

  getTestFieldsInfo(tableId: number):Observable<TestFieldsInfo[]>
  {
    let testFieldsInfo:TestFieldsInfo[]=[];
    const headers={'content-type':'application/json'}
    return this.httpClient.get<TestFieldsInfo[]>(environment.backendBaseURL+"/fields/tables/"+tableId,{'headers':headers}); 
  }


  fetchDropdownValuesFromBackEnd(applicationId:number, tableId: number): any {
    const headers={'content-type':'application/json'}
    console.log("tableId: "+tableId)
    return this.httpClient.get<TestDataMetaDropdownValues>(environment.backendBaseURL+"/applications/"+applicationId+"/tables/"+tableId+"/dropdownvalues", {'headers':headers})
    .subscribe(
      {
        next : (responseBody) => {
          this.testDataMetaDropdownValuesBehaviorSub.next(responseBody);
         // console.log("Fetched drop down values from back end" +JSON.stringify(responseBody));
        }
      }
    )
   
  }

  // setTestDataSearchcriteria(testDataSearchCriteria: TestDataSearchCriteria)
  // {
  //   this.testDataSearchCriteriaBehaviorSub.next(testDataSearchCriteria);
  // }

  getTestDataDropdownValuesAsObservable() :TestDataMetaDropdownValues
  {
    let testDataDropdownValues:TestDataMetaDropdownValues=new TestDataMetaDropdownValues();
    this.testDataMetaDropdownValuesAsObservable.subscribe(
      {
        next:(value)=>
        {
          testDataDropdownValues=value;
        }
      }
    )
    return testDataDropdownValues;
  }

  getTestDataMetaValuesAsObservable() : TestDataMeta[]
  {
    let testDataMeta: TestDataMeta[]=[];
    
    this.testDataMetaValuesAsObservable.subscribe(
      {
        next:(v)=>
        {
          testDataMeta=v;
         // console.log("getTestDataMetaValuesAsObservable() Test Data Meta:"+JSON.stringify(testDataMeta))
        }
      }
    )

    return testDataMeta;
  }

  objectToMap(object: any): Map<string, any>
  {
     const map = new Map(Object.entries(object));
     console.log("Object to map:"+JSON.stringify(map))
     return map;
  }

 

  fetchTestDataMetaFromBackend(applicationId:number, tableId: number, testDataSearchCriteria: TestDataSearchCriteria) 
  {
    const headers={'content-type':'application/json'}
    const request=JSON.stringify(testDataSearchCriteria);

    console.log("Search request in Service:"+request);

    console.log("Table ID requested before sending to backend:"+tableId);
    
      this.httpClient.post<TestDataMeta[]>(environment.backendBaseURL+"/applications/"+applicationId+"/tables/"+tableId+"/search", testDataSearchCriteria, {'headers':headers}).subscribe({
        next: (responseBody) => {
          this.testDataMetaValuesBehaviorSub.next(responseBody);
         console.log("ResponseData:"+responseBody+" : "+JSON.stringify(responseBody));
        },
        error: (e) => console.error(e),
        complete: () => console.info('Searched values loaded successfully') 
      }
      );

  }

  cloneTestData(applicationId:number, tableId: number, testDataMeta: TestDataMeta[]) 
  {
    const headers={'content-type':'application/json'}
    const request=JSON.stringify(testDataMeta);

    
      this.httpClient.post<TestDataMeta[]>(environment.backendBaseURL+"/applications/"+applicationId+"/tables/"+tableId+"/clone", request, 
      {'headers':headers}).subscribe({
        next: (responseBody) => {
          
          this.clonedTestDataMetaValuesBehaviorSub.next(responseBody);
          console.log("ResponseData:"+responseBody+" : "+JSON.stringify(responseBody));

          this.fetchDropdownValuesFromBackEnd(applicationId, tableId);
        },
        error: (e) => console.error(e),
        complete: () => console.info('Cloning completed successfully & dropdown updated') 
      }
      );

  }

  deleteTestData(applicationId:number, tableId: number, testDataMeta: TestDataMeta[])
  {
    const headers={'content-type':'application/json'}
    const request=JSON.stringify(testDataMeta);

     this.httpClient.put<string>(environment.backendBaseURL+"/applications/"+applicationId+"/tables/"+tableId+"/delete", request, 
      {'headers':headers}).subscribe({
        next: (responseBody) => {
          console.log("Deleted: "+responseBody);
          console.log("Deleted: "+JSON.stringify(responseBody));
          this.fetchDropdownValuesFromBackEnd(applicationId, tableId);
          alert(responseBody);
         
        },
        error: (e) => 
        {
          console.error(e)
          console.log("Deleted: "+e);
          console.log("Deleted: "+JSON.stringify(e));
        },
        complete: () => console.info('Deleted successfully & dropdown updated') 
      }
      );

  }

  updateTestData(applicationId:number, tableId: number, testDataMeta: TestDataMeta)
  {
    const headers={'content-type':'application/json'}
    const request=JSON.stringify(testDataMeta);

     this.httpClient.patch<TestDataMeta>(environment.backendBaseURL+"/applications/"+applicationId+"/tables/"+tableId+"/update", request, 
      {'headers':headers}).subscribe({
        next: (responseBody) => {
          console.log("Update response: "+JSON.stringify(responseBody));
          
          alert(responseBody);
          this.fetchDropdownValuesFromBackEnd(applicationId, tableId);
         
        },
        error: (e) => 
        {
          console.error(e)
          console.log("Update response: "+e);
          console.log("Update response: "+JSON.stringify(e));
          alert("Update error:"+JSON.stringify(e))
        },
        complete: () => console.info('Updated successfully & dropdown updated') 
      }
      );

  }

  subscriber(observerable: Observable<any>)
  {
    let responseData;
    observerable.subscribe({
      next: (responseBody) => {
        responseData=JSON.stringify(responseBody);
        console.log("ResponseData:"+responseData)
      },
      error: (e) => console.error(e),
      complete: () => console.info('API call completed successfully') 
    }
    );
    console.log("res",responseData);
    return responseData;
  }

 

  getTestDataMetaFields(): Map<string, string> {
    const testDataMetaColumns: Map<string, string> = new Map<string, string>();
    testDataMetaColumns.set('test_data_meta_id', 'Test Data Meta Id');
    testDataMetaColumns.set('test_case_id', 'Test Case Id');
    testDataMetaColumns.set('run_flag', 'Run Flag');
    testDataMetaColumns.set('test_scenario', 'Test Scenario');
    testDataMetaColumns.set('test_case_category', 'Testcase Category');
    testDataMetaColumns.set('test_script_name', 'Test Script Name');
    testDataMetaColumns.set('test_priority', 'Test Priority');
    testDataMetaColumns.set('jira_id', 'Jira Id');
    testDataMetaColumns.set('test_execution_time', 'Test Execution Time');
    testDataMetaColumns.set('created_by', 'Created By');
    testDataMetaColumns.set('created_date', 'Created Date');
    testDataMetaColumns.set('updated_by', 'Updated By');
    testDataMetaColumns.set('updated_date', 'Updated Date');
    testDataMetaColumns.set('delete_flag', 'Delete Flag');

    return testDataMetaColumns;
  }

  
}

function API_DOMAIN_NAME(API_DOMAIN_NAME: any, testDataSearchCriteria: TestDataSearchCriteria) {
  throw new Error("Function not implemented.");
}
