import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { TestDataService } from "../my-test-data/my-test-data.service";
import { TestFieldsInfo } from "../my-test-data/my-test-fields-info";
import { TestApplicationInfo } from "./my-test-applications-info";
import { TestTableInfo } from "./my-test-tables-info";

@Injectable()
export class ApplicationTableInfoService {

    private applicationListBehaviorSub: BehaviorSubject<TestApplicationInfo[]>;
    private applicationListAsObservable: Observable<TestApplicationInfo[]>;

    private applicationSelectedBehaviorSub : BehaviorSubject<number>;
    public applicationSelectedAsObservable: Observable<number>;

    public applicationSelected:number=0;

   

constructor(private httpClient: HttpClient)
{
  this.applicationListBehaviorSub = new BehaviorSubject<TestApplicationInfo[]>([]);
  this.applicationListAsObservable = this.applicationListBehaviorSub.asObservable();

  this.applicationSelectedBehaviorSub = new BehaviorSubject<number>(0);
  this.applicationSelectedAsObservable = this.applicationSelectedBehaviorSub.asObservable();

  this.applicationSelectedAsObservable.subscribe(
    {
      next:(value)=>this.applicationSelected=value
    }
  )
}



retrieveApplicationsList()
{
    const headers={'content-type':'application/json'}

    return this.httpClient.get<TestApplicationInfo[]>(environment.backendBaseURL+"/applications", {'headers':headers})
    .subscribe(
      {
        next : (responseBody) => {
          this.applicationListBehaviorSub.next(responseBody);
          const firstApp=this.getApplicationList()[0].applicationId;
          this.setApplication(firstApp);
          console.log("Retrieved Apllication List:" +JSON.stringify(responseBody));
        }
      }
    )
}


setApplication(applicationId:number)
{
    this.applicationSelectedBehaviorSub.next(applicationId);
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



}