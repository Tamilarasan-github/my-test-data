import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { LogoutComponent } from './logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LogInComponent } from './log-in/log-in.component';


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
  ]
})
export class AuthModule { }
