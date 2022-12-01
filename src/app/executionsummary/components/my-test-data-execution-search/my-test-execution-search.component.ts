import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TestExecutionSummaryService } from '../my-test-execution-summary/my-test-execution-summary-service';
import { TestExecutionSummarySearchCriteria } from './my-test-execution-summary-search-criteria';

@Component({
  selector: 'app-my-test-execution-search',
  templateUrl: './my-test-execution-search.component.html',
  styleUrls: ['./my-test-execution-search.component.css']
})
export class MyTestExecutionSearchComponent implements OnInit {

  constructor(private testExecutionSummaryService:TestExecutionSummaryService) { }

  

  
  ngOnInit(): void {
   
    
  }

  
 

}
