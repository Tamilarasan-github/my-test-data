import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ApiHttpService } from "src/app/api-http-service";
import { environment } from "src/environments/environment";
import { ApplicationTableInfoService } from "../my-header/my-application-table-info-service";
import { TestDataMeta } from "./my-test-data-results/my-test-data-meta";
import { TestDataMetaDropdownValues } from "./my-test-data-search/my-test-data-meta-dropdown-values";
import { TestDataSearchCriteria } from "./my-test-data-search/my-test-data-search-criteria";


@Injectable()
export class TestDataService {

 
 private testDataMetaDropdownValuesBehaviorSub: BehaviorSubject<TestDataMetaDropdownValues>;
 public testDataMetaDropdownValuesAsObservable: Observable<TestDataMetaDropdownValues>;

 private testDataMetaValuesBehaviorSub: BehaviorSubject<TestDataMeta[]>;
 public testDataMetaValuesAsObservable: Observable<TestDataMeta[]>;

 private testDataMetaValuesAsMapBehaviorSub: BehaviorSubject<Map<string, string>[]>;
 public testDataMetaValuesAsMapAsObservable: Observable<Map<string, string>[]>;

 private testFieldsBehaviorSub: BehaviorSubject<Map<string, string>>;
 public testFieldsAsObservable: Observable<Map<string, string>>;

 private testFieldOrderBehaviorSub: BehaviorSubject<Map<string, number>>;
 public testFieldOrderAsObservable: Observable<Map<string, number>>;

  ui_field_names: Map<string, string> = new Map<string, string>();
  db_field_names: Map<string, string> = new Map<string, string>();

  constructor(private httpClient: HttpClient, private apiHttpService: ApiHttpService)
  {
    this.testDataMetaDropdownValuesBehaviorSub=new BehaviorSubject<TestDataMetaDropdownValues>(new TestDataMetaDropdownValues());
    this.testDataMetaDropdownValuesAsObservable=this.testDataMetaDropdownValuesBehaviorSub.asObservable();
    
    this.testDataMetaValuesBehaviorSub=new BehaviorSubject<TestDataMeta[]>([]);
    this.testDataMetaValuesAsObservable=this.testDataMetaValuesBehaviorSub.asObservable();

    this.testDataMetaValuesAsMapBehaviorSub=new BehaviorSubject<Map<string, string>[]>([]);
    this.testDataMetaValuesAsMapAsObservable=this.testDataMetaValuesAsMapBehaviorSub.asObservable();

    this.testFieldsBehaviorSub=new BehaviorSubject<Map<string, string>>(new Map);
    this.testFieldsAsObservable=this.testFieldsBehaviorSub.asObservable();

    this.testFieldOrderBehaviorSub=new BehaviorSubject<Map<string, number>>(new Map);
    this.testFieldOrderAsObservable=this.testFieldOrderBehaviorSub.asObservable();
  }

  fetchDropdownValuesFromBackEnd(applicationId:number, tableId: number): any {
    const headers={'content-type':'application/json'}
    console.log("tableId"+tableId)
    return this.httpClient.get<TestDataMetaDropdownValues>(environment.backendBaseURL+"/applications/"+applicationId+"/tables/"+tableId+"/dropdownvalues", {'headers':headers})
    .subscribe(
      {
        next : (responseBody) => {
          this.testDataMetaDropdownValuesBehaviorSub.next(responseBody);
          console.log("Fetched drop down values from back end" +JSON.stringify(responseBody));
        }
      }
    )
   
  }

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

 

  fetchTestDataMetaFromBackend(applicationId:number, tableId: number, testDataSearchCriteria: TestDataSearchCriteria, ) 
  {
    const headers={'content-type':'application/json'}
    const request=JSON.stringify(testDataSearchCriteria);
    let testDataMetaValuesMap: Map<string, string>[]=[]

    console.log("Table ID requested before sending to backend:"+tableId);

    this. getFieldsOrder();

      this.httpClient.post<TestDataMeta[]>(environment.backendBaseURL+"/applications/"+applicationId+"/tables/"+tableId+"/search", request, {'headers':headers}).subscribe({
        next: (responseBody) => {
          this.testDataMetaValuesBehaviorSub.next(responseBody);
          console.log("ResponseData:"+responseBody+" : "+JSON.stringify(responseBody));
        },
        error: (e) => console.error(e),
        complete: () => console.info('Drop down values loaded successfully') 
      }
      );

  }

  cloneTestData(testDataMeta: TestDataMeta[]) 
  {
    const headers={'content-type':'application/json'}
    const request=JSON.stringify(testDataMeta);

    
      this.httpClient.post<TestDataMeta[]>(environment.backendBaseURL+"/testdata/clone", request, 
      {'headers':headers}).subscribe({
        next: (responseBody) => {
          
          this.testDataMetaValuesBehaviorSub.next(responseBody);
          console.log("ResponseData:"+responseBody+" : "+JSON.stringify(responseBody));
        },
        error: (e) => console.error(e),
        complete: () => console.info('Cloning completed successfully') 
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

  

  getFieldsOrder()
  {
    const headers={'content-type':'application/json'}
    let fieldOrderMap: Map<string, number>=new Map<string, number>();
    
    this.httpClient.get<Map<string, number>>(environment.backendBaseURL+"/fields/fieldsorder",
    {'headers':headers}).subscribe({
      next: (responseBody) => {
        this.testFieldOrderBehaviorSub.next(responseBody);
        fieldOrderMap=responseBody;
        console.log("Fields Order:"+responseBody+" : "+JSON.stringify(responseBody));
      },
      error: (e) => console.error(e),
      complete: () => console.info('Fields fetched successfully') 
    }
    );
    return fieldOrderMap;
  }


}

function API_DOMAIN_NAME(API_DOMAIN_NAME: any, testDataSearchCriteria: TestDataSearchCriteria) {
  throw new Error("Function not implemented.");
}
