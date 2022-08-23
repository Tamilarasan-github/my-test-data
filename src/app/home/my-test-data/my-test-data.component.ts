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

 

  testFieldsInfoTableMap:Map<number, TestFieldsInfo[]>;
  
  constructor(private testFieldsInfoService:TestFieldsInfoService) {
   
    this.testFieldsInfoTableMap=new Map<number, TestFieldsInfo[]>();

    this.testFieldsInfoService.testFieldsTableWiseAsObservable.subscribe(
      {
        next:(value)=>
        {
          this.testFieldsInfoTableMap=value
          console.log("testFieldsInfoTableMap in MyTestDataComponent:"+JSON.stringify(this.testFieldsInfoTableMap));
        }
      }
    )
   }  

  ngOnInit(): void {
  }

  

}
