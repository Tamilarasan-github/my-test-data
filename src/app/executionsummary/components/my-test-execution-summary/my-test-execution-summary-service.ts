import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApplicationTableInfoService } from "../../../public/my-application-table-info-service";
import { SuiteExecutionSearch } from "../my-suite-execution-history/suite-execution-search.model";
import { TestSuiteExecutionInfo, TestSuiteExecutionRequest } from "../my-suite-execution-history/suite.model";
import { TestDataMetaExecutionHistory } from "../my-test-data-execution-history/my-test-data-meta-execution-history";
import { TestDataMetaExecutionSearch } from "../my-test-data-execution-history/my-test-data-meta-execution-search.model";
import { TestExecutionSummarySearchCriteria } from "../my-test-data-execution-search/my-test-execution-summary-search-criteria";
import { TestScriptsExecutionHistory } from "../my-test-scripts-execution-history/test-scripts-execution-history";
import { TestScriptsExecutionSearch } from "../my-test-scripts-execution-history/testscripts-execution-search.model";


@Injectable()
export class TestExecutionSummaryService
{
    
    private applicationSelectedBehaviorSub : BehaviorSubject<number>;
    public applicationSelectedAsObservable: Observable<number>;
    public applicationSelectedId: number;

    private testSuiteExecutionTotalPagesBehaviorSub: BehaviorSubject<number>;
    public testSuiteExecutionTotalPagesAsObservable: Observable<number>;
  
    private testSuiteExecutionNumOfElementsBehaviorSub: BehaviorSubject<number>;
    public testSuiteExecutionNumOfElementsAsObservable: Observable<number>;
  
    private testSuiteExecutionHasNextBehaviorSub: BehaviorSubject<boolean>;
    public testSuiteExecutionHasNextAsObservable: Observable<boolean>;
  
    private testSuiteExecutionHasPreviousBehaviorSub: BehaviorSubject<boolean>;
    public testSuiteExecutionHasPreviousAsObservable: Observable<boolean>;
  
    private testSuiteExecutionCurrentPageBehaviorSub: BehaviorSubject<number>;
    public testSuiteExecutionCurrentPageAsObservable: Observable<number>;

    private testSuiteExecutionHistoryBehaviourSub:BehaviorSubject<TestSuiteExecutionInfo[]>;
    public testSuiteExecutionHistoryAsObservable:Observable<TestSuiteExecutionInfo[]>;


    private testScriptExecutionTotalPagesBehaviorSub: BehaviorSubject<number>;
    public testScriptExecutionTotalPagesAsObservable: Observable<number>;
  
    private testScriptExecutionNumOfElementsBehaviorSub: BehaviorSubject<number>;
    public testScriptExecutionNumOfElementsAsObservable: Observable<number>;
  
    private testScriptExecutionHasNextBehaviorSub: BehaviorSubject<boolean>;
    public testScriptExecutionHasNextAsObservable: Observable<boolean>;
  
    private testScriptExecutionHasPreviousBehaviorSub: BehaviorSubject<boolean>;
    public testScriptExecutionHasPreviousAsObservable: Observable<boolean>;
  
    private testScriptExecutionCurrentPageBehaviorSub: BehaviorSubject<number>;
    public testScriptExecutionCurrentPageAsObservable: Observable<number>;

    private testScriptsExecutionHistoryBehaviorSub: BehaviorSubject<TestScriptsExecutionHistory[]>;
    public testScriptsExecutionHistoryAsObservable: Observable<TestScriptsExecutionHistory[]>;

    private testDataMetaExecutionTotalPagesBehaviorSub: BehaviorSubject<number>;
    public testDataMetaExecutionTotalPagesAsObservable: Observable<number>;
  
    private testDataMetaExecutionNumOfElementsBehaviorSub: BehaviorSubject<number>;
    public testDataMetaExecutionNumOfElementsAsObservable: Observable<number>;
  
    private testDataMetaExecutionHasNextBehaviorSub: BehaviorSubject<boolean>;
    public testDataMetaExecutionHasNextAsObservable: Observable<boolean>;
  
    private testDataMetaExecutionHasPreviousBehaviorSub: BehaviorSubject<boolean>;
    public testDataMetaExecutionHasPreviousAsObservable: Observable<boolean>;
  
    private testDataMetaExecutionCurrentPageBehaviorSub: BehaviorSubject<number>;
    public testDataMetaExecutionCurrentPageAsObservable: Observable<number>;

    private testDataMetaExecutionHistoryBehaviorSub: BehaviorSubject<TestDataMetaExecutionHistory[]>;
    public testDataMetaExecutionHistoryAsObservable: Observable<TestDataMetaExecutionHistory[]>;

    private reportBehaviorSub: BehaviorSubject<string>;
    public reportAsObservable: Observable<string>;

    constructor(private httpClient: HttpClient,  private applicationTableInfoService:ApplicationTableInfoService) {
        this.applicationSelectedId=0;

        this.applicationSelectedBehaviorSub = new BehaviorSubject<number>(0);
        this.applicationSelectedAsObservable = this.applicationSelectedBehaviorSub.asObservable();

        this.testSuiteExecutionHistoryBehaviourSub=new BehaviorSubject<TestSuiteExecutionInfo[]>([]);
        this.testSuiteExecutionHistoryAsObservable=this.testSuiteExecutionHistoryBehaviourSub.asObservable();

        this.testScriptsExecutionHistoryBehaviorSub=new BehaviorSubject<TestScriptsExecutionHistory[]>([]);
        this.testScriptsExecutionHistoryAsObservable=this.testScriptsExecutionHistoryBehaviorSub.asObservable();
        
        this.testDataMetaExecutionHistoryBehaviorSub=new BehaviorSubject<TestDataMetaExecutionHistory[]>([]);
        this.testDataMetaExecutionHistoryAsObservable=this.testDataMetaExecutionHistoryBehaviorSub.asObservable();

        this.testSuiteExecutionTotalPagesBehaviorSub= new BehaviorSubject<number>(0);
  this.testSuiteExecutionTotalPagesAsObservable= this.testSuiteExecutionTotalPagesBehaviorSub.asObservable();

  this.testSuiteExecutionNumOfElementsBehaviorSub= new BehaviorSubject<number>(0);
  this.testSuiteExecutionNumOfElementsAsObservable= this.testSuiteExecutionNumOfElementsBehaviorSub.asObservable();

  this.testSuiteExecutionHasNextBehaviorSub= new BehaviorSubject<boolean>(false);
  this.testSuiteExecutionHasNextAsObservable= this.testSuiteExecutionHasNextBehaviorSub.asObservable();

  this.testSuiteExecutionHasPreviousBehaviorSub= new BehaviorSubject<boolean>(false);
  this.testSuiteExecutionHasPreviousAsObservable= this.testSuiteExecutionHasPreviousBehaviorSub.asObservable();

  this.testSuiteExecutionCurrentPageBehaviorSub= new BehaviorSubject<number>(0);
  this.testSuiteExecutionCurrentPageAsObservable= this.testSuiteExecutionCurrentPageBehaviorSub.asObservable();

  this.testScriptExecutionTotalPagesBehaviorSub= new BehaviorSubject<number>(0);
  this.testScriptExecutionTotalPagesAsObservable= this.testScriptExecutionTotalPagesBehaviorSub.asObservable();

  this.testScriptExecutionNumOfElementsBehaviorSub= new BehaviorSubject<number>(0);
  this.testScriptExecutionNumOfElementsAsObservable= this.testScriptExecutionNumOfElementsBehaviorSub.asObservable();

  this.testScriptExecutionHasNextBehaviorSub= new BehaviorSubject<boolean>(false);
  this.testScriptExecutionHasNextAsObservable= this.testScriptExecutionHasNextBehaviorSub.asObservable();

  this.testScriptExecutionHasPreviousBehaviorSub= new BehaviorSubject<boolean>(false);
  this.testScriptExecutionHasPreviousAsObservable= this.testScriptExecutionHasPreviousBehaviorSub.asObservable();

  this.testScriptExecutionCurrentPageBehaviorSub= new BehaviorSubject<number>(0);
  this.testScriptExecutionCurrentPageAsObservable= this.testScriptExecutionCurrentPageBehaviorSub.asObservable();


  this.testDataMetaExecutionTotalPagesBehaviorSub= new BehaviorSubject<number>(0);
  this.testDataMetaExecutionTotalPagesAsObservable= this.testDataMetaExecutionTotalPagesBehaviorSub.asObservable();

  this.testDataMetaExecutionNumOfElementsBehaviorSub= new BehaviorSubject<number>(0);
  this.testDataMetaExecutionNumOfElementsAsObservable= this.testDataMetaExecutionNumOfElementsBehaviorSub.asObservable();

  this.testDataMetaExecutionHasNextBehaviorSub= new BehaviorSubject<boolean>(false);
  this.testDataMetaExecutionHasNextAsObservable= this.testDataMetaExecutionHasNextBehaviorSub.asObservable();

  this.testDataMetaExecutionHasPreviousBehaviorSub= new BehaviorSubject<boolean>(false);
  this.testDataMetaExecutionHasPreviousAsObservable= this.testDataMetaExecutionHasPreviousBehaviorSub.asObservable();

  this.testDataMetaExecutionCurrentPageBehaviorSub= new BehaviorSubject<number>(0);
  this.testDataMetaExecutionCurrentPageAsObservable= this.testDataMetaExecutionCurrentPageBehaviorSub.asObservable();

        this.applicationTableInfoService.applicationSelectedAsObservable.subscribe(
            {
                next:(value)=>
                {
                    this.applicationSelectedId=value;
                    this.applicationSelectedBehaviorSub.next(value);
                }
            }
        )

        

        this.reportBehaviorSub=new BehaviorSubject<string>('');
        this.reportAsObservable=this.reportBehaviorSub.asObservable();
    }

    executeTestScripts(testSuiteExecutionRequest: TestSuiteExecutionRequest)
    {
      return this.httpClient.post<string[]>(environment.backendBaseURL+"/applications/"+this.applicationSelectedId+"/execution-summary/testscripts/execute",testSuiteExecutionRequest);
       
    }

    executeSuites(testSuiteExecutionHistory: TestSuiteExecutionInfo)
    {
      return this.httpClient.post(environment.backendBaseURL+"/applications/"+this.applicationSelectedId+"/execution-summary/suites/execute",testSuiteExecutionHistory);
    }

   

    getTestSuiteExecutionHistory()
    {
        const headers={'content-type':'application/json'}
  
        return this.httpClient.get<TestSuiteExecutionInfo[]>(environment.backendBaseURL+"/applications/"+this.applicationSelectedId+"/execution-summary/suites", {'headers':headers})
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

    
    fetchTestSuiteExecutionHistoryBySearchCriteria(
    suiteExecutionSearch:SuiteExecutionSearch, pageNumber:number, pageSize:number, sort: string) 
    {
    console.log("Page num requested in service:"+pageNumber);
    const headers = { 'content-type': 'application/json' };
     
    const params = new HttpParams()
      .set('page', pageNumber)
      .set('size', pageSize)
      .set('sort', sort);
      
    const request = JSON.stringify(suiteExecutionSearch);

    console.log('Search request in Service:' + request);

    this.httpClient
      .post<TestSuiteExecutionInfo[]>(
        environment.backendBaseURL +'/applications/' +this.applicationSelectedId +'/execution-summary/suites/search',
        suiteExecutionSearch,
        { observe: 'response', headers: headers, params:params }
      )
      .subscribe(
      {
        next: (response) => {
          console.log("Total pages:"+response.headers.get('totalPages'))
          this.testSuiteExecutionTotalPagesBehaviorSub.next(parseInt(response.headers.get('totalPages')!));
          this.testSuiteExecutionNumOfElementsBehaviorSub.next(parseInt(response.headers.get('numOfElements')!));
          this.testSuiteExecutionHasNextBehaviorSub.next(response.headers.get('hasNext') =="true");
          this.testSuiteExecutionHasPreviousBehaviorSub.next(response.headers.get('hasPrevious') =="true");
          this.testSuiteExecutionCurrentPageBehaviorSub.next(parseInt(response.headers.get('currentPage')!)+1);
          
          this.testSuiteExecutionHistoryBehaviourSub.next(response.body!);
          console.log(JSON.stringify(response));
        },
        error: (e) => console.error(e),
        complete: () =>
          console.info('Test Suite Search completed successfully'),
      });
  }

  fetchTestScriptExecutionHistoryBySearchCriteria(
    testScriptExecutionSearch:TestScriptsExecutionSearch, pageNumber:number, pageSize:number, sort: string) 
    {
    console.log("Page num requested in service:"+pageNumber);
    const headers = { 'content-type': 'application/json' };
     
    const params = new HttpParams()
      .set('page', pageNumber)
      .set('size', pageSize)
      .set('sort', sort);
      
    const request = JSON.stringify(testScriptExecutionSearch);

    console.log('testScriptExecutionSearch request in Service:' + request);

    this.httpClient
      .post<TestScriptsExecutionHistory[]>(
        environment.backendBaseURL +'/applications/' +this.applicationSelectedId +'/execution-summary/testscripts/search',
        testScriptExecutionSearch,
        { observe: 'response', headers: headers, params:params }
      )
      .subscribe(
      {
        next: (response) => {
          console.log("Total pages:"+response.headers.get('totalPages'))
          this.testScriptExecutionTotalPagesBehaviorSub.next(parseInt(response.headers.get('totalPages')!));
          this.testScriptExecutionNumOfElementsBehaviorSub.next(parseInt(response.headers.get('numOfElements')!));
          this.testScriptExecutionHasNextBehaviorSub.next(response.headers.get('hasNext') =="true");
          this.testScriptExecutionHasPreviousBehaviorSub.next(response.headers.get('hasPrevious') =="true");
          this.testScriptExecutionCurrentPageBehaviorSub.next(parseInt(response.headers.get('currentPage')!)+1);
          
          this.testScriptsExecutionHistoryBehaviorSub.next(response.body!);
          console.log(JSON.stringify(response));
        },
        error: (e) => console.error(e),
        complete: () =>
          console.info('Test Scripts Search completed successfully'),
      });
  }

  fetchTestDataMetaExecutionHistoryBySearchCriteria(
    testDataMetaExecutionSearch:TestDataMetaExecutionSearch, pageNumber:number, pageSize:number, sort: string) 
    {
    console.log("Page num requested in service:"+pageNumber);
    const headers = { 'content-type': 'application/json' };
     
    const params = new HttpParams()
      .set('page', pageNumber)
      .set('size', pageSize)
      .set('sort', sort);
      
    const request = JSON.stringify(testDataMetaExecutionSearch);

    console.log('testDataMetaExecutionSearch request in Service:' + request);

    this.httpClient
      .post<TestDataMetaExecutionHistory[]>(
        environment.backendBaseURL +'/applications/' +this.applicationSelectedId +'/execution-summary/testdata/search',
        testDataMetaExecutionSearch,
        { observe: 'response', headers: headers, params:params }
      )
      .subscribe(
      {
        next: (response) => {
          console.log("Total pages:"+response.headers.get('totalPages'))
          this.testDataMetaExecutionTotalPagesBehaviorSub.next(parseInt(response.headers.get('totalPages')!));
          this.testDataMetaExecutionNumOfElementsBehaviorSub.next(parseInt(response.headers.get('numOfElements')!));
          this.testDataMetaExecutionHasNextBehaviorSub.next(response.headers.get('hasNext') =="true");
          this.testDataMetaExecutionHasPreviousBehaviorSub.next(response.headers.get('hasPrevious') =="true");
          this.testDataMetaExecutionCurrentPageBehaviorSub.next(parseInt(response.headers.get('currentPage')!)+1);
          
          this.testDataMetaExecutionHistoryBehaviorSub.next(response.body!);
          console.log(JSON.stringify(response));
        },
        error: (e) => console.error(e),
        complete: () =>
          console.info('Test Data Meta Search completed successfully'),
      });
  }

    getTestScriptsExecutionHistory(suiteExecutionId: number)
    {
        const headers={'content-type':'application/json'}
  
        return this.httpClient.get<TestScriptsExecutionHistory[]>(environment.backendBaseURL+"/applications/"+this.applicationSelectedId+"/execution-summary/suites/"+suiteExecutionId+"/testScripts", {'headers':headers})
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

    

   

    executeSuite(suiteId: number)
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

    cancelSuiteExecution(suiteId: number)
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