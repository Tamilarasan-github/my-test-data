import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationTableInfoService } from '../../../public/my-application-table-info-service';
import { TestExecutionSummaryService } from '../../../executionsummary/components/my-test-execution-summary/my-test-execution-summary-service';

@Component({
  selector: 'app-my-test-reports',
  templateUrl: './my-test-reports.component.html',
  styleUrls: ['./my-test-reports.component.css']
})
export class MyTestReportsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private testExecutionSummaryService:TestExecutionSummaryService, private applicationTableInfoService:ApplicationTableInfoService ) { }
  suiteId: string='';
  reportContent:string='';
  applicationSelected: number=0;

  ngOnInit(): void {
    this.suiteId = this.route.snapshot.paramMap.get('suiteId')!;

    this.applicationSelected=this.applicationTableInfoService.applicationSelected;

    this.testExecutionSummaryService.viewReport(1001, this.suiteId);
    this.testExecutionSummaryService.reportAsObservable.subscribe(
      {
      next:(value)=> this.reportContent=value
      }
    )
  }

}
