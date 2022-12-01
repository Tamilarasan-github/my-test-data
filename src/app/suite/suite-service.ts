import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TestSuiteExecutionInfo } from "../executionsummary/components/my-suite-execution-history/suite.model";
import { ApplicationTableInfoService } from "../public/my-application-table-info-service";
import { TestScript } from "../testscripts/test-scripts";
import { SuiteSearch } from "./components/suite-list/suite-search.model";
import { SuiteCreateModel } from "./suite-create.model";
import { Suite } from "./suite.model";

@Injectable()
export class SuiteService
{
    private applicationSelectedBehaviorSub : BehaviorSubject<number>;
    public applicationSelectedAsObservable: Observable<number>;
    public applicationSelectedId: number;

    private testSuiteListTotalPagesBehaviorSub: BehaviorSubject<number>;
    public testSuiteListTotalPagesAsObservable: Observable<number>;
  
    private testSuiteListNumOfElementsBehaviorSub: BehaviorSubject<number>;
    public testSuiteListNumOfElementsAsObservable: Observable<number>;
  
    private testSuiteListHasNextBehaviorSub: BehaviorSubject<boolean>;
    public testSuiteListHasNextAsObservable: Observable<boolean>;
  
    private testSuiteListHasPreviousBehaviorSub: BehaviorSubject<boolean>;
    public testSuiteListHasPreviousAsObservable: Observable<boolean>;
  
    private testSuiteListCurrentPageBehaviorSub: BehaviorSubject<number>;
    public testSuiteListCurrentPageAsObservable: Observable<number>;

    private testSuiteListBehaviourSub:BehaviorSubject<Suite[]>;
    public testSuiteListAsObservable:Observable<Suite[]>;

    private testScriptsListInSuiteBehaviourSub:BehaviorSubject<TestScript[]>;
    public testScriptsListInSuiteAsObservable:Observable<TestScript[]>;

    constructor(private httpClient: HttpClient,  private applicationTableInfoService:ApplicationTableInfoService) {
        this.applicationSelectedId=0;

        this.applicationSelectedBehaviorSub = new BehaviorSubject<number>(0);
        this.applicationSelectedAsObservable = this.applicationSelectedBehaviorSub.asObservable();

        this.testSuiteListTotalPagesBehaviorSub= new BehaviorSubject<number>(0);
        this.testSuiteListTotalPagesAsObservable= this.testSuiteListTotalPagesBehaviorSub.asObservable();

        this.testSuiteListNumOfElementsBehaviorSub= new BehaviorSubject<number>(0);
        this.testSuiteListNumOfElementsAsObservable= this.testSuiteListNumOfElementsBehaviorSub.asObservable();

        this.testSuiteListHasNextBehaviorSub= new BehaviorSubject<boolean>(false);
        this.testSuiteListHasNextAsObservable= this.testSuiteListHasNextBehaviorSub.asObservable();

        this.testSuiteListHasPreviousBehaviorSub= new BehaviorSubject<boolean>(false);
        this.testSuiteListHasPreviousAsObservable= this.testSuiteListHasPreviousBehaviorSub.asObservable();

        this.testSuiteListCurrentPageBehaviorSub= new BehaviorSubject<number>(0);
        this.testSuiteListCurrentPageAsObservable= this.testSuiteListCurrentPageBehaviorSub.asObservable();

        this.testSuiteListBehaviourSub= new BehaviorSubject<Suite[]>([]);
        this.testSuiteListAsObservable= this.testSuiteListBehaviourSub.asObservable();

        this.testScriptsListInSuiteBehaviourSub= new BehaviorSubject<TestScript[]>([]);
        this.testScriptsListInSuiteAsObservable= this.testScriptsListInSuiteBehaviourSub.asObservable();


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

    createSuite(suiteCreateRequest:SuiteCreateModel)
    {
      return this.httpClient.post<Suite>(environment.backendBaseURL +'/applications/' +this.applicationSelectedId +'/suites/create', suiteCreateRequest);
    }


    fetchTestSuiteListBySearchCriteria(
        suiteSearch:SuiteSearch, pageNumber:number, pageSize:number, sort: string) 
        {
        console.log("Page num requested in service:"+pageNumber);
        const headers = { 'content-type': 'application/json' };
         
        const params = new HttpParams()
          .set('page', pageNumber)
          .set('size', pageSize)
          .set('sort', sort);
          
        const request = JSON.stringify(suiteSearch);
    
        console.log('Search request in Service:' + request);
    
        this.httpClient
          .post<Suite[]>(
            environment.backendBaseURL +'/applications/' +this.applicationSelectedId +'/suites/search',
            suiteSearch,
            { observe: 'response', headers: headers, params:params }
          )
          .subscribe(
          {
            next: (response) => {
              console.log("Total pages:"+response.headers.get('totalPages'))
              this.testSuiteListTotalPagesBehaviorSub.next(parseInt(response.headers.get('totalPages')!));
              this.testSuiteListNumOfElementsBehaviorSub.next(parseInt(response.headers.get('numOfElements')!));
              this.testSuiteListHasNextBehaviorSub.next(response.headers.get('hasNext') =="true");
              this.testSuiteListHasPreviousBehaviorSub.next(response.headers.get('hasPrevious') =="true");
              this.testSuiteListCurrentPageBehaviorSub.next(parseInt(response.headers.get('currentPage')!)+1);
              
              this.testSuiteListBehaviourSub.next(response.body!);
              console.log(JSON.stringify(response));
            },
            error: (e) => console.error(e),
            complete: () =>
              console.info('Test Suite Search completed successfully'),
          });
      }

      fetchTestScriptsBySuiteId(suiteId: number)
      {
        return  this.httpClient.get<TestScript[]>(environment.backendBaseURL +'/applications/' +this.applicationSelectedId +'/suites/testscripts/'+suiteId)
        .subscribe(
          {
             next: (response) => {
              this.testScriptsListInSuiteBehaviourSub.next(response);
              console.log(JSON.stringify(response));
             },
             error: (e) => console.error(e),
             complete: () =>
               console.info('Test Scripts fetch based on selected Suite - completed successfully'),
          }
        );
      }
    
}