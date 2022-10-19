import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationTableInfoService } from 'src/app/public/my-application-table-info-service';
import { LogInService } from './log-in.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  username: string;
  password: string;

  constructor(private router:Router, private logInService:LogInService, private applicationTableInfoService:ApplicationTableInfoService) { 
    this.username="";
    this.password="";
  }

  ngOnInit(): void {
  }

  validateLoginCredentials()
  {
    this.logInService.validateLoginCredentials(this.username, this.password);
   
    this.router.navigateByUrl("/testscripts");

    this.applicationTableInfoService.retrieveApplicationsList();
  }
}
