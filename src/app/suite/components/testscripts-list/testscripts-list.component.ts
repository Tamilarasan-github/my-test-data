import { Component, OnInit } from '@angular/core';
import { TestScript } from 'src/app/testscripts/test-scripts';
import { SuiteService } from '../../suite-service';

@Component({
  selector: 'app-testscripts-list',
  templateUrl: './testscripts-list.component.html',
  styleUrls: ['./testscripts-list.component.css']
})
export class TestscriptsListComponent implements OnInit {

  testScripts: TestScript[];
  
  constructor(private suiteService:SuiteService) { 
    this.testScripts=[];
    this.suiteService.testScriptsListInSuiteAsObservable.subscribe(
      {
        next: (value) => this.testScripts=value
      }
    )
  }

  ngOnInit(): void {
  }

}
