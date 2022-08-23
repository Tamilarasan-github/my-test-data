import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApplicationTableInfoService } from "../my-header/my-application-table-info-service";
import { TestTableInfo } from "../my-header/my-test-tables-info";
import { TestFieldsInfo } from "./my-test-fields-info";

@Injectable()
export class TestFieldsInfoService {

    private testFieldsInfoBehaviorSub: BehaviorSubject<TestFieldsInfo[]>;
    public testFieldsInfoAsObservable: Observable<TestFieldsInfo[]>;

    private testFieldsTableWiseBehaviorSub:BehaviorSubject<Map<number, TestFieldsInfo[]>>;
    public testFieldsTableWiseAsObservable:Observable<Map<number, TestFieldsInfo[]>>;

    public tableListOfSelectedApp: TestTableInfo[];
    
    constructor(private httpClient: HttpClient)
    {
        this.tableListOfSelectedApp=[];
        this.testFieldsInfoBehaviorSub=new BehaviorSubject<TestFieldsInfo[]>([]);
        this.testFieldsInfoAsObservable=this.testFieldsInfoBehaviorSub.asObservable();

        this.testFieldsTableWiseBehaviorSub=new BehaviorSubject<Map<number, TestFieldsInfo[]>>(new Map);
        this.testFieldsTableWiseAsObservable=this.testFieldsTableWiseBehaviorSub.asObservable();

          
    }

  
}