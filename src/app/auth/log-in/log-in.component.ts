import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  userName:string="";
  password:string="";
  isValidLogin: boolean=false;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  validateLoginCredentials()
  {
    this.isValidLogin= true;
    this.router.navigateByUrl("/home");
  }

}
