import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard-services';
import { IDashboardStatsRequest } from './dashboard-stats-request-model';
import { DashboardStats } from './dashboard.stats.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dashboardStatsDateFrom: Date;
  dashboardStatsDateTo: Date;

  dashboardStats: DashboardStats;

  constructor(private dashboardService: DashboardService, private datepipe: DatePipe) { 
    this.dashboardStatsDateFrom = new Date('2000-01-01');
    this.dashboardStatsDateTo = new Date('2099-12-31');

    this.dashboardStats = new DashboardStats();

    this.dashboardService.dashboardStatsAsObservable.subscribe(
      {
        next:(value)=> {
          this.dashboardStats=value;
        },
      }
    )
  }


  ngOnInit(): void {
    this.fetchDashboardStats();
  }

  fetchDashboardStats()
  {
    const dashboardStatsRequest: IDashboardStatsRequest={
      'dateFrom': this.dashboardStatsDateFrom,
      'dateTo': this.dashboardStatsDateTo,
    }

    this.dashboardService.fetchDashboardStats(dashboardStatsRequest);
  }
}
