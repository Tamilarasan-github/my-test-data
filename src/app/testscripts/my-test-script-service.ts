
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ApplicationTableInfoService } from "src/app/public/my-application-table-info-service";
import { environment } from "src/environments/environment";
import { DataUpdate } from "../public/data.update.model";
import { TestDataService } from "../testdata/my-test-data.service";


import { TestScript } from "./test-scripts";
import { TestScriptExecution } from "./test-scripts-execution";
import { TestScriptSearchCriteria } from "./test-scripts-search-criteria";

@Injectable()
export class TestScriptsService {
    private testScriptsDropdownValuesBehaviorSub: BehaviorSubject<TestScriptSearchCriteria>;
    public testScriptsDropdownValuesAsObservable: Observable<TestScriptSearchCriteria>;

    private testScriptsBehaviorSub: BehaviorSubject<TestScript[]>;
    public testScriptsAsObservable: Observable<TestScript[]>;
   
   
    private applicationSelectedBehaviorSub : BehaviorSubject<number>;
    public applicationSelectedAsObservable: Observable<number>;

    public applicationSelectedId: number;

    constructor(private httpClient: HttpClient,  private applicationTableInfoService:ApplicationTableInfoService, private testDataService:TestDataService) {
        this.testScriptsDropdownValuesBehaviorSub = new BehaviorSubject<TestScriptSearchCriteria>(new TestScriptSearchCriteria([],[],[],[],new Date,new Date,[],new Date,new Date));
        this.testScriptsDropdownValuesAsObservable = this.testScriptsDropdownValuesBehaviorSub.asObservable();

        this.testScriptsBehaviorSub = new BehaviorSubject<TestScript[]>([]);
        this.testScriptsAsObservable = this.testScriptsBehaviorSub.asObservable();

        this.applicationSelectedId=0;

        this.applicationSelectedBehaviorSub = new BehaviorSubject<number>(0);
        this.applicationSelectedAsObservable = this.applicationSelectedBehaviorSub.asObservable();

        this.applicationTableInfoService.applicationSelectedAsObservable.subscribe(
            {
                next:(value)=>
                {
                    this.applicationSelectedId=value;
                    this.applicationSelectedBehaviorSub.next(value);
                }
            }
        )
        
    }


    fetchTestScriptsDropdownValues(applicationId:number) 
    {
        const headers={'content-type':'application/json'}
  
        return this.httpClient.get<TestScriptSearchCriteria>(environment.backendBaseURL+"/applications/"+applicationId+"/testscripts/dropdownvalues", {'headers':headers})
        .subscribe(
          {
            next : (responseBody) => {
                this.testScriptsDropdownValuesBehaviorSub.next(responseBody);
              
            },
            error :(e)=> {
                console.log("Tables fetching error:"+e);
                console.error()
            }
           
          })
    }

    fetchTestScripts(applicationId:number, testScriptSearchCriteria: TestScriptSearchCriteria) {
        const headers={'content-type':'application/json'}
       
        this.httpClient.post<TestScript[]>(environment.backendBaseURL+"/applications/"+applicationId+"/testscripts/search", testScriptSearchCriteria)
        .subscribe(
          {
            next : (responseBody) => {
                this.testScriptsBehaviorSub.next(responseBody);
               
                console.log("Testscripts in response:"+responseBody);
                console.log("Testscripts in response:"+JSON.stringify(responseBody));
              
            },
            error :(e)=> {
                console.log("Tables fetching error:"+e);
                console.error()
            }
           
          })
    }

    executeTestScriptsBatch(applicationId:number, testScriptExecution:TestScriptExecution)
    {
        const headers={'content-type':'application/json'}
       
        this.httpClient.post<String>(environment.backendBaseURL+"/applications/"+applicationId+"/testscripts/run", testScriptExecution, {'headers':headers})
        .subscribe(
          {
            next : (responseBody) => {
                
                console.log("Testscripts in response:"+responseBody);
                console.log("Testscripts in response:"+JSON.stringify(responseBody));
              
            },
            error :(e)=> {
                console.log("Tables fetching error:"+e);
                console.error()
            }
           
          })
    }

    addSuiteToExecutionList(applicationId:number, testScriptExecution:TestScriptExecution)
    {
        const headers={'content-type':'application/json'}
       
        this.httpClient.post<String>(environment.backendBaseURL+"/applications/"+applicationId+"/testscripts/addSuiteToExecution", testScriptExecution, {'headers':headers})
        .subscribe(
          {
            next : (responseBody) => {
                
                console.log("Testscripts in response:"+responseBody);
                console.log("Testscripts in response:"+JSON.stringify(responseBody));
              
            },
            error :(e)=> {
                console.log("Tables fetching error:"+e);
                console.error()
            }
           
          })
    }

    fetchTestData()
    {
        
    }

    saveTestscript(applicationId:number, testScript:TestScript)
    {
        return this.httpClient.post<TestScript>(environment.backendBaseURL+"/applications/"+applicationId+"/testscripts/save", testScript);
    }

    deleteTestscript(applicationId:number, testScript:TestScript)
    {
        return this.httpClient.post<TestScript>(environment.backendBaseURL+"/applications/"+applicationId+"/testscripts/delete", testScript);
    }

    updateTestscript(applicationId:number, updateTestscript: DataUpdate)
    {
        // let obj;
        // updateTestscript.forEach((value: Map<string, string>, key: number) => {
        //     console.log("Object.fromEntries(value):" +JSON.stringify(Object.fromEntries(value)))
        //     obj={
        //             [key]:JSON.stringify(Object.fromEntries(value))
        //         }
        // });
        // console.log("Update Map to JSON:"+obj)
        return this.httpClient.post<TestScript>(environment.backendBaseURL+"/applications/"+applicationId+"/testscripts/update",updateTestscript);
    }

}