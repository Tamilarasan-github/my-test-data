import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
