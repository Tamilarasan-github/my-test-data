import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LogInComponent } from './components/log-in/log-in.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LogInService } from './components/log-in/log-in.service';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    LogInComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    BrowserModule, 
    ReactiveFormsModule,
  ],
  exports: [
    LogInComponent,
    LogoutComponent
  ],

  providers:[
    { provide: LogInService },
    { provide: AuthGuard}
  ]

})
export class AuthModule { }
