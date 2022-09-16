import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApplicationTableInfoService } from "../my-header/my-application-table-info-service";
import { TestSuiteExecutionHistory } from "./my-suite-execution-history/suite";
import { TestDataMetaExecutionHistory } from "./my-test-data-execution-history/my-test-data-meta-execution-history";

import { TestExecutionSummarySearchCriteria } from "./my-test-data-execution-search/my-test-execution-summary-search-criteria";
import { TestScriptsExecutionHistory } from "./my-test-scripts-execution-history/test-scripts-execution-history";

@Injectable()
export class TestExecutionSummaryService
{
    
    private applicationSelectedBehaviorSub : BehaviorSubject<number>;
    public applicationSelectedAsObservable: Observable<number>;
    public applicationSelectedId: number;

    private testSuiteExecutionHistoryBehaviourSub:BehaviorSubject<TestSuiteExecutionHistory[]>;
    public testSuiteExecutionHistoryAsObservable:Observable<TestSuiteExecutionHistory[]>;

    private testScriptsExecutionHistoryBehaviorSub: BehaviorSubject<TestScriptsExecutionHistory[]>;
    public testScriptsExecutionHistoryAsObservable: Observable<TestScriptsExecutionHistory[]>;

    private testDataMetaExecutionHistoryBehaviorSub: BehaviorSubject<TestDataMetaExecutionHistory[]>;
    public testDataMetaExecutionHistoryAsObservable: Observable<TestDataMetaExecutionHistory[]>;

    private reportBehaviorSub: BehaviorSubject<string>;
    public reportAsObservable: Observable<string>;

    constructor(private httpClient: HttpClient,  private applicationTableInfoService:ApplicationTableInfoService) {
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

        this.testSuiteExecutionHistoryBehaviourSub=new BehaviorSubject<TestSuiteExecutionHistory[]>([]);
        this.testSuiteExecutionHistoryAsObservable=this.testSuiteExecutionHistoryBehaviourSub.asObservable();

        this.testScriptsExecutionHistoryBehaviorSub=new BehaviorSubject<TestScriptsExecutionHistory[]>([]);
        this.testScriptsExecutionHistoryAsObservable=this.testScriptsExecutionHistoryBehaviorSub.asObservable();
        
        this.testDataMetaExecutionHistoryBehaviorSub=new BehaviorSubject<TestDataMetaExecutionHistory[]>([]);
        this.testDataMetaExecutionHistoryAsObservable=this.testDataMetaExecutionHistoryBehaviorSub.asObservable();

        this.reportBehaviorSub=new BehaviorSubject<string>('');
        this.reportAsObservable=this.reportBehaviorSub.asObservable();
    }

    getTestExecutionSummaryDropdownValues():TestExecutionSummarySearchCriteria
    {
        const response=
            new TestExecutionSummarySearchCriteria(['1001', '1002'],
                ['T001', 'T002'],
                ['PASS', 'FAIL', 'No Results'],
                ['Smoke Test', 'Regression'],
                ['JIRA-01', 'JIRA-21'],
                ['TestScript-001', 'TestScript-002'],
                ['Hello', 'World'],
                ['Tamilarasan S']);
        

        return response;
    }

    getTestSuiteExecutionHistory()
    {
        const headers={'content-type':'application/json'}
  
        return this.httpClient.get<TestSuiteExecutionHistory[]>(environment.backendBaseURL+"/applications/"+this.applicationSelectedId+"/execution-summary/suites", {'headers':headers})
        .subscribe(
          {
            next : (responseBody) => {
                this.testSuiteExecutionHistoryBehaviourSub.next(responseBody);
                console.log(JSON.stringify(responseBody));
            },
            error :(e)=> {
                console.log("Test Suite Execution History fetching error:"+e);
                console.error()
            }
           
          })
    }

    getTestScriptsExecutionHistory(suiteId: string)
    {
        const headers={'content-type':'application/json'}
  
        return this.httpClient.get<TestScriptsExecutionHistory[]>(environment.backendBaseURL+"/applications/"+this.applicationSelectedId+"/execution-summary/suites/"+suiteId+"/testScripts", {'headers':headers})
        .subscribe(
          {
            next : (responseBody) => {
                this.testScriptsExecutionHistoryBehaviorSub.next(responseBody);
              console.log("TestScripts Execution History:"+JSON.stringify(responseBody));
            },
            error :(e)=> {
                console.log("Test Scripts Execution History fetching error:"+e);
                console.error()
            }
           
          })
    }

    getTestDataMetaExecutionHistory(testScriptExecutionId: string)
    {
        const headers={'content-type':'application/json'}
  
        return this.httpClient.post<TestDataMetaExecutionHistory[]>(environment.backendBaseURL+"/applications/"+this.applicationSelectedId+"/execution-summary/testDataMeta/execution-history", {'testScriptExecutionId':testScriptExecutionId}, {'headers':headers})
        .subscribe(
          {
            next : (responseBody) => {
                this.testDataMetaExecutionHistoryBehaviorSub.next(responseBody);
              console.log(JSON.stringify(responseBody));
            },
            error :(e)=> {
                console.log("Test Data Meta Execution History fetching error:"+e);
                console.error()
            }
           
          })
    }

    executeSuite(suiteId: string)
    {
        const headers={'content-type':'application/json'}
       
        this.httpClient.post<String>(environment.backendBaseURL+"/applications/"+this.applicationSelectedId+"/execution-summary/testSuite/run", {"suiteId":suiteId}, {'headers':headers})
        .subscribe(
          {
            next : (responseBody) => {
                console.log("Suite Exec Testscripts in response:"+JSON.stringify(responseBody));
              
            },
            error :(e)=> {
                console.log("Executing Suite error:"+JSON.stringify(e));
                console.error()
            }
           
          })
    }

    cancelSuiteExecution(suiteId: string)
    {
        const headers={'content-type':'application/json'}
       
        this.httpClient.post<String>(environment.backendBaseURL+"/applications/"+this.applicationSelectedId+"/execution-summary/testSuite/cancel", {"suiteId":suiteId}, {'headers':headers})
        .subscribe(
          {
            next : (responseBody) => {
                console.log("Canceling Suite Execution in response:"+JSON.stringify(responseBody));
              
            },
            error :(e)=> {
                console.log("Canceling Suite Execution error:"+JSON.stringify(e));
                console.error()
            }
           
          })
    }

    viewReport(applicationSelectedId:number, suiteId: string)
    {
        const headers={
            'Accept': 'text/html',
        'content-type':'application/json',
        }

       console.log("this.applicationSelectedId:"+this.applicationSelectedId)
        this.httpClient.get(environment.backendBaseURL+"/applications/"+applicationSelectedId+"/execution-summary/testSuite/view-report/"+suiteId, {'headers':headers})
        .subscribe(
          {
            next : (responseBody) => {
                console.log("View Report in response:"+JSON.stringify(responseBody));
               // this.reportBehaviorSub.next(responseBody.);
            },
            error :(e)=> {
                console.log("View Report error:"+JSON.stringify(e));
                console.error()
            }
           
          })
    }
}