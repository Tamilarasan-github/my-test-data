import { Component, Input, OnInit } from '@angular/core';
import { TestExecutionSummaryService } from './my-test-execution-summary-service';

@Component({
  selector: 'app-my-test-execution-summary',
  templateUrl: './my-test-execution-summary.component.html',
  styleUrls: ['./my-test-execution-summary.component.css']
})
export class MyTestExecutionSummaryComponent implements OnInit {

  
  constructor(private testExecutionSummaryService:TestExecutionSummaryService) { 
     
  }

  ngOnInit(): void 
  {
  }

}
