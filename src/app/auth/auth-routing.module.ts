import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {path: 'login', component: LogInComponent},
  {path: 'logout', component: LogoutComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
