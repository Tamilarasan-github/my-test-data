import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { ApiHttpService } from "./api-http-service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { MySuiteExecutionHistoryComponent } from "./executionsummary/components/my-suite-execution-history/my-suite-execution-history.component";
import { MyTestExecutionResultsComponent } from "./executionsummary/components/my-test-data-execution-history/my-test-data-execution-history.component";
import { MyTestExecutionSearchComponent } from "./executionsummary/components/my-test-data-execution-search/my-test-execution-search.component";
import { MyTestScriptsExecutionHistoryComponent } from "./executionsummary/components/my-test-scripts-execution-history/my-test-scripts-execution-history.component";

import { TestExecutionSummaryService } from "./executionsummary/components/my-test-execution-summary/my-test-execution-summary-service";
import { MyTestExecutionSummaryComponent } from "./executionsummary/components/my-test-execution-summary/my-test-execution-summary.component";
import { MyTestReportsComponent } from "./reports/components/my-test-reports/my-test-reports.component";
import { NgbModalService } from "./home/ngbModalService";
import { HttpRequestResponseInterceptor } from "./http-request-response-interceptor";
import { ApplicationTableInfoService } from "./public/my-application-table-info-service";
import { PublicModule } from "./public/public.module";
import { SpinnerService } from "./spinner-service";
import { MyBulkUpdatesComponent } from "./testdata/components/my-bulk-updates/my-bulk-updates.component";
import { MyTestDataResultsComponent } from "./testdata/components/my-test-data-results/my-test-data-results.component";
import { MyTestDataSearchComponent } from "./testdata/components/my-test-data-search/my-test-data-search.component";
import { MyTestDataComponent } from "./testdata/my-test-data.component";
import { TestDataService } from "./testdata/my-test-data.service";
import { TestFieldsInfoService } from "./testdata/my-test-fields-service";
import { MyTestScriptsComponent } from "./testscripts/components/my-test-scripts.component";
import { TestScriptsService } from "./testscripts/my-test-script-service";
import { TestscriptsRoutingModule } from "./testscripts/testscripts-routing.module";
import { HomeComponent } from "./home/components/home/home.component";
import { DashboardService } from "./home/components/home/dashboard-services";
import { DatePipe } from "@angular/common";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyTestScriptsComponent,
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
    
  
    NgMultiSelectDropDownModule,
    NgbModule,
    HttpClientModule,
    AuthModule,
    PublicModule,
    TestscriptsRoutingModule
  ],
  exports: [ 
   
  ],
  providers: [
    { provide: DashboardService},
    { provide: TestScriptsService },
    { provide: ApiHttpService },
    { provide: TestDataService },
    { provide: TestExecutionSummaryService },
    { provide: ApplicationTableInfoService },
    { provide: TestFieldsInfoService },
    { provide: NgbModalService },
    { provide: SpinnerService },
    { provide: DatePipe},

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestResponseInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
