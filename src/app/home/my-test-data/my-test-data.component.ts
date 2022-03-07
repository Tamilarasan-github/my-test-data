import { Component, Input, OnInit } from '@angular/core';
import { ApplicationTableInfoService } from '../my-header/my-application-table-info-service';
import { TestDataMeta } from './my-test-data-results/my-test-data-meta';
import { TestFieldsInfo } from './my-test-fields-info';
import { TestFieldsInfoService } from './my-test-fields-service';

@Component({
  selector: 'app-my-test-data',
  templateUrl: './my-test-data.component.html',
  styleUrls: ['./my-test-data.component.css']
})
export class MyTestDataComponent implements OnInit {

  testFieldsInfo: TestFieldsInfo[];
  
  constructor(private testFieldsInfoService:TestFieldsInfoService) {
    this.testFieldsInfo=[];

    this.testFieldsInfoService.getFieldsInfo();

    this.testFieldsInfoService.testFieldsInfoAsObservable.subscribe(
      {
        next:(value)=>
        {
          this.testFieldsInfo=value
          console.log("Test Fields Info in MyTestDataComponent:"+this.testFieldsInfo.length);
        }
      }
    )
   }  

  ngOnInit(): void {
  }

}
