import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './auth/log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { MyTestDataComponent } from './home/my-test-data/my-test-data.component';
import { MyTestExecutionSummaryComponent } from './home/my-test-execution-summary/my-test-execution-summary.component';
import { MyTestReportsComponent } from './home/my-test-reports/my-test-reports.component';


const routes: Routes = [

  { path: 'login', component: LogInComponent},
  { path: 'home', component: HomeComponent},
  { path: 'testdata', component: MyTestDataComponent },
  {
    path: 'testexecutionsummary',
    component: MyTestExecutionSummaryComponent,
  },
  {
    path: 'testreports/:suiteId',
    component: MyTestReportsComponent,
    // children:
    // [
    //   {
    //       path: '**',
    //       component: MyTestReportsComponent
    //   }
    // ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
