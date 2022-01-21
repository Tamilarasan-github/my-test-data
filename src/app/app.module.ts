import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MyHeaderComponent } from './home/my-header/my-header.component';
import { MyTestScriptsComponent } from './home/my-test-scripts/my-test-scripts.component';

import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

//import { ModuleOfNgb } from '@ng-bootstrap/ng-bootstrap';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MyTestDataComponent } from './home/my-test-scripts/my-test-data/my-test-data.component';
import { MyTestDataResultsComponent } from './home/my-test-scripts/my-test-data/my-test-data-search/my-test-data-results/my-test-data-results.component';
import { MyTestDataSearchComponent } from './home/my-test-scripts/my-test-data/my-test-data-search/my-test-data-search.component';
import { MyTestExecutionSummaryComponent } from './home/my-test-scripts/my-test-data/my-test-execution-summary/my-test-execution-summary.component';
import { MyTestExecutionSearchComponent } from './home/my-test-scripts/my-test-data/my-test-execution-summary/my-test-execution-search/my-test-execution-search.component';
import { MyTestExecutionResultsComponent } from './home/my-test-scripts/my-test-data/my-test-execution-summary/my-test-execution-results/my-test-execution-results.component';
import { MyTestDataService } from './home/my-test-scripts/my-test-data/my-test-data.service';
import { MyTestScriptService } from './home/my-test-scripts/my-test-script-service';
import { MyTestExecutionSummaryService } from './home/my-test-scripts/my-test-data/my-test-execution-summary/my-test-execution-summary-service';
import { MyTestReportsComponent } from './home/my-test-reports/my-test-reports.component';

const appRoute=[  
  { path: 'test-scripts', component: MyTestScriptsComponent }, 
  { path: 'test-data', component: MyTestDataComponent },
  { path: 'test-execution-summary', component: MyTestExecutionSummaryComponent },
  { path: 'test-reports', component: MyTestReportsComponent }
 
 ];

@NgModule({
  declarations: [
    AppComponent,
    MyHeaderComponent,
    MyTestScriptsComponent,
    HomeComponent,
    MyTestDataComponent,
    MyTestDataSearchComponent,
    MyTestDataResultsComponent,
    MyTestExecutionSummaryComponent,
    MyTestExecutionSearchComponent,
    MyTestExecutionResultsComponent,
    MyTestReportsComponent,
   
        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    NgMultiSelectDropDownModule,
    NgbModule,
    RouterModule.forRoot(appRoute),
      
  ],
  providers: [MyTestScriptService, MyTestDataService, MyTestExecutionSummaryService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
