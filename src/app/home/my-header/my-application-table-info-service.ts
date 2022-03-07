import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { TestDataService } from "../my-test-data/my-test-data.service";
import { TestApplicationInfo } from "./my-test-applications-info";
import { TestTableInfo } from "./my-test-tables-info";

@Injectable()
export class ApplicationTableInfoService {

    private applicationListBehaviorSub: BehaviorSubject<TestApplicationInfo[]>;
    private applicationListAsObservable: Observable<TestApplicationInfo[]>;

    private applicationSelectedBehaviorSub : BehaviorSubject<number>;
    private applicationSelectedAsObservable: Observable<number>;

    private tableListBehaviorSub: BehaviorSubject<TestTableInfo[]>;
    private tableListAsObservable: Observable<TestTableInfo[]>;

    private tableSelectedBehaviorSub : BehaviorSubject<number>;
    private tableSelectedAsObservable: Observable<number>;

constructor(private httpClient: HttpClient, private testDataService:TestDataService)
{
  this.applicationListBehaviorSub = new BehaviorSubject<TestApplicationInfo[]>([]);
  this.applicationListAsObservable = this.applicationListBehaviorSub.asObservable();

  this.applicationSelectedBehaviorSub = new BehaviorSubject<number>(0);
  this.applicationSelectedAsObservable = this.applicationSelectedBehaviorSub.asObservable();

  this.tableListBehaviorSub = new BehaviorSubject<TestTableInfo[]>([]);
  this.tableListAsObservable = this.tableListBehaviorSub.asObservable();

  this.tableSelectedBehaviorSub = new BehaviorSubject<number>(0);
  this.tableSelectedAsObservable = this.tableSelectedBehaviorSub.asObservable();
}



retrieveApplicationsList()
{
    const headers={'content-type':'application/json'}

    return this.httpClient.get<TestApplicationInfo[]>(environment.backendBaseURL+"/applications", {'headers':headers})
    .subscribe(
      {
        next : (responseBody) => {
          this.emitApplicationList(responseBody);
          console.log("Retrieved Apllication List:" +JSON.stringify(responseBody));
        }
      }
    )
}

retrieveRespectiveTables()
{
    const headers={'content-type':'application/json'}
   
    return this.httpClient.get<TestTableInfo[]>(environment.backendBaseURL+"/applications/"+this.getSeletedApplication()+"/tables", {'headers':headers})
    .subscribe(
      {
        next : (responseBody) => {
          this.emitTableList(responseBody);
        },
        error :(e)=> {
            console.log("Tables fetching error:"+e);
            console.error()
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
          this.emitTableList(responseBody);
        },
        error :(e)=> {
            console.log("Tables fetching error:"+e);
            console.error()
        }
       
      }
    )
}

emitApplicationList(testApplicationInfo: TestApplicationInfo[])
{
  this.applicationListBehaviorSub.next(testApplicationInfo);
  console.log("New Applications List:"+testApplicationInfo);
}

emitTableList(testTableInfo: TestTableInfo[])
{
  this.tableListBehaviorSub.next(testTableInfo);
  console.log("New Applications List:"+JSON.stringify(testTableInfo));
}

setApplication(applicationId:number)
{
    this.applicationSelectedBehaviorSub.next(applicationId);

    this.applicationSelectedAsObservable.subscribe(
      {
        next:(value) =>
        {
        this.retrieveTablesList(value);
        }
      })
}
    

setTable(tableId:number)
{
    console.log("Setting Table Id to "+tableId);
    this.tableSelectedBehaviorSub.next(tableId);
    this.testDataService.fetchDropdownValuesFromBackEnd(this.getSeletedApplication(), this.getSeletedTable());
}

getApplicationList(): TestApplicationInfo[]
{
  let applicationList:TestApplicationInfo[]=[];
  this.applicationListAsObservable.subscribe(
    {
      next:(value) =>
      {
        applicationList=value;
      }
    })
    return applicationList;
}

getTableList(): TestTableInfo[]
{
  let tableList : TestTableInfo[]= [];
  this.tableListAsObservable.subscribe(
    {
      next:(value) =>
      {
        tableList=value;
      }
    });
  
    return tableList;
}

getSeletedApplication(): number
{
  let applicationSelected=0;
  this.applicationSelectedAsObservable.subscribe(
    {
      next:(value) =>
      {
        applicationSelected=value;
      }
    })

    console.log("Application Selected:" +applicationSelected);
    return applicationSelected;
}

getSeletedTable(): number
{
  let tableSelected = 0;
  this.tableSelectedAsObservable.subscribe(
    {
      next:(value) =>
      {
        tableSelected=value;
        console.log("getSeletedTable() Table Selected:" +tableSelected);
      }
    });
    console.log("getSeletedTable() Table Selected:" +tableSelected);
    return tableSelected;
}

}