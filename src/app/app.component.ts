
import { Component } from '@angular/core';
import { SpinnerService } from './spinner-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-front-end';
  showSpinner:boolean=false;

  constructor(private spinnerService:SpinnerService)
  {
    this.spinnerService.showSpinnerAsObservable.subscribe(
      {
      next:(value)=>this.showSpinner=value
      }
    )
  }

}


