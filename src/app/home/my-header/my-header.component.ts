import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TestScriptsService } from '../my-test-scripts/my-test-script-service';
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
  applicationIdSelected: number;
  showSideBar: boolean=false;
  constructor(private router:Router, private applicationTableInfoService:ApplicationTableInfoService, private testScriptsService:TestScriptsService) {
    this.applicationIdSelected=1001;
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
    
    this.applicationTableInfoService.getApplicationList().forEach(element => {
      console.log("app names:"+element.applicationName);
      if(element.applicationName===applicationNameSelected)
      {
        this.applicationIdSelected=element.applicationId;
        this.applicationTableInfoService.setApplication(this.applicationIdSelected);
        
      }
    });
  }

  fetchTestScriptsDropdownValues()
  {
    this.testScriptsService.fetchTestScriptsDropdownValues(this.applicationIdSelected);
  }

  toggleSideBar()
  {
    this.showSideBar=!this.showSideBar;
  }

}
