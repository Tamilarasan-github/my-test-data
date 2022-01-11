import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-header',
  templateUrl: './my-header.component.html',
  styleUrls: ['./my-header.component.css']
})
export class MyHeaderComponent 
{

  @ViewChild('app-my-test-scripts') show: any;
  
  
  constructor(private router:Router) { }

  featureSelected:string='';

  ngOnInit(): void {
  }

  navigateToHome()
  {
    this.router.navigate(['/']);
  }

  navigateToFeature(feature:string) {
    this.featureSelected=feature;
  }

  navigateToExecutionSummary(event:any) {
    this.router.navigate(['/execution-summary']);
  }

  navigateToTestScripts(event:any) {
    this.router.navigate(['/test-scripts']);
  }

}
