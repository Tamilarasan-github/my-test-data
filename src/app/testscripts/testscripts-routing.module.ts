import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyTestScriptsComponent } from "./my-test-scripts.component";


const routes:Routes = [
    {path:'testscripts', component: MyTestScriptsComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class TestscriptsRoutingModule
{

}