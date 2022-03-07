import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TestFieldsInfo } from "./my-test-fields-info";

@Injectable()
export class TestFieldsInfoService {

    private testFieldsInfoBehaviorSub: BehaviorSubject<TestFieldsInfo[]>;
    public testFieldsInfoAsObservable: Observable<TestFieldsInfo[]>;
    constructor(private httpClient: HttpClient)
    {
        this.testFieldsInfoBehaviorSub=new BehaviorSubject<TestFieldsInfo[]>([]);
        this.testFieldsInfoAsObservable=this.testFieldsInfoBehaviorSub.asObservable();
    }

    getFieldsInfo()
    {
        const headers={'content-type':'application/json'}
        this.httpClient.get<TestFieldsInfo[]>(environment.backendBaseURL+"/fields",{'headers':headers}).subscribe({
            next: (responseBody) => {
              this.testFieldsInfoBehaviorSub.next(responseBody);
              console.log("Fields Info: No JSON stringify:"+responseBody);
              console.log("Fields Info:"+responseBody.length);


            },
            error: (e) => console.error(e),
            complete: () => console.info('Fields Info fetched successfully') 
          }
          );
    }
    
}