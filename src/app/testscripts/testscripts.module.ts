import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestScriptsService } from './my-test-script-service';

import { AppModule } from '../app.module';
import { CommonModule } from '@angular/common';
import { TestscriptsRoutingModule } from './testscripts-routing.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,    
    FormsModule,  
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    NgbModule,
    TestscriptsRoutingModule,
    AppModule
  ],
  providers: [
      ],
})
export class TestscriptsModule { }
