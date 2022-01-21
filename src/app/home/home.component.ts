import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  selectedModule:string='';

  ngOnInit(): void {
  }

  navigateToModule(moduleName:string)
  {
    console.log(moduleName)
    this.selectedModule=moduleName;
  }
}
