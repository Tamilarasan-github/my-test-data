import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModalService } from '../home/ngbModalService';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestScriptsService } from './my-test-script-service';
import { MyTestScriptsComponent } from './my-test-scripts.component';
import { AppModule } from '../app.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TestscriptsRoutingModule } from './testscripts-routing.module';

@NgModule({
  declarations: [
    MyTestScriptsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule,
    NgbModule,
    HttpClientModule,
    AppModule,
    TestscriptsRoutingModule
  ],
  providers: [
    { provide: TestScriptsService },
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class TestscriptsModule { }
