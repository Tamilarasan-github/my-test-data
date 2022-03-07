import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationTableInfoService } from './my-application-table-info-service';
import { TestApplicationInfo } from './my-test-applications-info';
import { TestTableInfo } from './my-test-tables-info';

@Component({
  selector: 'app-my-header',
  templateUrl: './my-header.component.html',
  styleUrls: ['./my-header.component.css']
})
export class MyHeaderComponent 
{

  @ViewChild('app-my-test-scripts') show: any;
  @Output() featureSelected=new EventEmitter<string>();

  highlightFeature:string='';

  constructor(private router:Router, private applicationTableInfoService:ApplicationTableInfoService) {
    this.applicationTableInfoService.retrieveApplicationsList();
   }

  ngOnInit(): void {
    
    this.applicationTableInfoService.retrieveApplicationsList();
   
  }

  // ngOnChanges()
  // {
  //   console.log("Header ngOnChanges() triggered!!!!")
  // }
  // ngDoCheck()
  // {
  //   console.log("Header ngDoCheck() triggered!!!!")
  // }
  // ngAfterContentInit()
  // {
  //   console.log("Header ngAfterContentInit() triggered!!!!")
  // }
  // ngAfterContentChecked()
  // {
  //   console.log("Header ngAfterContentChecked() triggered!!!!")
  // }
  // ngAfterViewInit()
  // {
  //   console.log("Header ngAfterViewInit() triggered!!!!")
  // }
  // ngAfterViewChecked()
  // {
  //   console.log("Header ngAfterViewChecked() triggered!!!!")
  // }
  // ngOnDestroy()
  // {
  //   console.log("Header ngOnDestroy() triggered!!!!")
  // }
  

  getApplicationList() : TestApplicationInfo[]
  {
    return this.applicationTableInfoService.getApplicationList();
  }

  getTableList() : TestTableInfo[]
  {
    return this.applicationTableInfoService.getTableList();
  }

  navigateToHome()
  {
    this.router.navigate(['/']);
  }

  navigateToFeature(feature:string) {
    this.highlightFeature=feature;
    this.featureSelected.emit(feature);
    console.log('Clicked '+feature)
  }

  highlight(selectedFeature:string):string
  {
    if(selectedFeature===this.highlightFeature)
    {
      return 'highlight-selected-Link';
    }
    return '';
  }

  changeApplication(event: Event)
  {
    console.log("Switched to application:" +(<HTMLInputElement>event.target).value);
    let applicationNameSelected=(<HTMLInputElement>event.target).value;
    let applicationIdSelected: number;

    this.applicationTableInfoService.getApplicationList().forEach(element => {
      console.log("app names:"+element.applicationName);
      if(element.applicationName===applicationNameSelected)
      {
        applicationIdSelected=element.applicationId;
        this.applicationTableInfoService.setApplication(applicationIdSelected);
        
      }
    });
  }

  changeTable(event: Event)
  {
    let tableNameSelected=(<HTMLInputElement>event.target).value;
    let tableIdSelected: number=0;

    this.applicationTableInfoService.getTableList().forEach(element => {
     
      if(element.tableName===tableNameSelected)
      {
        console.log(JSON.stringify(element));
        console.log("Table name:"+element.tableName+ "Table ID:"+element.tableId);

        tableIdSelected=element.tableId;
        this.applicationTableInfoService.setTable(tableIdSelected);      
      }
    });
  }

}
