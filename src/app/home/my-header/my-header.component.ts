import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router:Router) { }

  ngOnInit(): void {
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

}
