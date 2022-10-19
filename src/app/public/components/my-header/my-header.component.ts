import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationTableInfoService } from '../../my-application-table-info-service';
import { TestApplicationInfo } from '../../my-test-applications-info';


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

  selectApplication:string;
  applicationIdSelected: number;
  applicationSelectDropdownVisible: boolean;

  myProfileDropdownVisible: boolean;
  profileName: string;

  showSideBar: boolean=false;
  constructor(private router:Router, private applicationTableInfoService:ApplicationTableInfoService) {
    this.selectApplication='Select Application';
    this.applicationIdSelected=1001;
    this.applicationSelectDropdownVisible=false;

    this.myProfileDropdownVisible=false;
    this.profileName="tamil"

    
   }

  ngOnInit(): void {
    // if(this.showHeader())
    // {
    // this.applicationTableInfoService.retrieveApplicationsList();
    // }
  }

  showHeader()
  {
    if(this.router.url === '/login')
    {
      return false;
    }
    else{
      return true;
    }
  }

  changeApplicationSelectedDropdownVisibility()
  {
    this.applicationSelectDropdownVisible=!this.applicationSelectDropdownVisible;
  }

  changeMyProfileDropdownVisiblity()
  {
    this.myProfileDropdownVisible=!this.myProfileDropdownVisible;
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

  changeApplication(application: TestApplicationInfo)
  {
    this.applicationSelectDropdownVisible=this.applicationSelectDropdownVisible;
    console.log("Switched to application:" +application.applicationName);
    const applicationNameSelected=application.applicationName;
    const applicationIdSelected=application.applicationId;
    
    this.applicationTableInfoService.getApplicationList().forEach(element => {
      if(element.applicationName===applicationNameSelected)
      {
        this.applicationIdSelected=element.applicationId;
        this.applicationTableInfoService.setApplication(this.applicationIdSelected);
      }
      this.selectApplication=applicationNameSelected;
    });
  }

  fetchTestScriptsDropdownValues()
  {
   // this.testScriptsService.fetchTestScriptsDropdownValues(this.applicationIdSelected);
  }

  toggleSideBar()
  {
    this.showSideBar=!this.showSideBar;
  }

}
