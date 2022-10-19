import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IDashboardStatsRequest } from "./dashboard-stats-request-model";
import { DashboardStats } from "./dashboard.stats.model";

@Injectable()
export class DashboardService
{
    private dashboardStatsBehaviorSub: BehaviorSubject<DashboardStats>;
    public dashboardStatsAsObservable: Observable<DashboardStats>;
        
    constructor(private httpClient:HttpClient)
    {
        this.dashboardStatsBehaviorSub = new BehaviorSubject<DashboardStats>(new DashboardStats());
        this.dashboardStatsAsObservable = this.dashboardStatsBehaviorSub.asObservable();
    }

    fetchDashboardStats(dashboardStatsRequest: IDashboardStatsRequest)
    {
        console.log("Dashboard Stats Request:"+dashboardStatsRequest);

        this.httpClient.post<DashboardStats>(environment.backendBaseURL+"/applications/1001/dashboardStats",dashboardStatsRequest).subscribe({
            next: (responseBody) => {
                console.log("Dashboard Stats:"+JSON.stringify(responseBody));
                this.dashboardStatsBehaviorSub.next(responseBody);
            },
            error: (e) => console.error(e),
            complete: () =>
              console.info('Dashboard Stats fetched successfully'),
          });
    }
    
}