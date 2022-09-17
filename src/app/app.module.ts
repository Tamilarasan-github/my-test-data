import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyHeaderComponent } from './home/my-header/my-header.component';


import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

//import { ModuleOfNgb } from '@ng-bootstrap/ng-bootstrap';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MyTestReportsComponent } from './home/my-test-reports/my-test-reports.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiHttpService } from './api-http-service';
import { MyTestDataComponent } from './home/my-test-data/my-test-data.component';
import { MyTestExecutionSummaryComponent } from './home/my-test-execution-summary/my-test-execution-summary.component';
import { MyTestDataResultsComponent } from './home/my-test-data/my-test-data-results/my-test-data-results.component';
import { MyTestDataSearchComponent } from './home/my-test-data/my-test-data-search/my-test-data-search.component';
import { MyTestExecutionResultsComponent } from './home/my-test-execution-summary/my-test-data-execution-history/my-test-data-execution-history.component';
import { MyTestExecutionSearchComponent } from './home/my-test-execution-summary/my-test-data-execution-search/my-test-execution-search.component';
import { MyBulkUpdatesComponent } from './home/my-test-data/my-bulk-updates/my-bulk-updates.component';
import { TestDataService } from './home/my-test-data/my-test-data.service';
import { TestExecutionSummaryService } from './home/my-test-execution-summary/my-test-execution-summary-service';
import { ApplicationTableInfoService } from './home/my-header/my-application-table-info-service';
import { TestFieldsInfoService } from './home/my-test-data/my-test-fields-service';
import { MySuiteExecutionHistoryComponent } from './home/my-test-execution-summary/my-suite-execution-history/my-suite-execution-history.component';
import { MyTestScriptsExecutionHistoryComponent } from './home/my-test-execution-summary/my-test-scripts-execution-history/my-test-scripts-execution-history.component';
import { NgbModalService } from './home/ngbModalService';
import { SpinnerService } from './spinner-service';
import { HttpRequestResponseInterceptor } from './http-request-response-interceptor';




@NgModule({
  declarations: [
    AppComponent,
    MyHeaderComponent,
    HomeComponent,
    MyTestDataComponent,
    MyTestDataSearchComponent,
    MyTestDataResultsComponent,
    MyTestExecutionSummaryComponent,
    MyTestExecutionSearchComponent,
    MyTestExecutionResultsComponent,
    MyTestReportsComponent,
    MyBulkUpdatesComponent,
    MySuiteExecutionHistoryComponent,
    MyTestScriptsExecutionHistoryComponent,
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
    HttpClientModule,
  ],
  exports: [ 
    MyTestDataSearchComponent,
    MyTestDataResultsComponent,
  ],
  providers: [
    { provide: ApiHttpService },
    { provide: TestDataService },
    { provide: TestExecutionSummaryService },
    { provide: ApplicationTableInfoService },
    { provide: TestFieldsInfoService },
    { provide: NgbModalService },
    { provide: SpinnerService },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestResponseInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
