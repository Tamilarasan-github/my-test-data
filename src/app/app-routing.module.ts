import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LogInComponent } from './auth/components/log-in/log-in.component';
import { LogoutComponent } from './auth/components/logout/logout.component';

import { MyTestExecutionSummaryComponent } from './executionsummary/components/my-test-execution-summary/my-test-execution-summary.component';
import { HomeComponent } from './home/components/home/home.component';
import { MyTestReportsComponent } from './reports/components/my-test-reports/my-test-reports.component';
import { SuiteComponent } from './suite/components/suite-list/suite.component';
import { MyTestDataComponent } from './testdata/my-test-data.component';
import { MyTestScriptsComponent } from './testscripts/components/my-test-scripts.component';


const routes: Routes = [

  { path: 'login', component: LogInComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'suite', component: SuiteComponent, canActivate: [AuthGuard]},
  { path: 'testscripts', component: MyTestScriptsComponent, canActivate: [AuthGuard]},
  { path: 'test-data', component: MyTestDataComponent, canActivate: [AuthGuard]},
  { path: 'test-execution-summary', component: MyTestExecutionSummaryComponent, canActivate: [AuthGuard]},
  { path: 'test-reports/:suiteId', component: MyTestReportsComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
