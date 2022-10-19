import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyTestScriptsComponent } from "./components/my-test-scripts.component";



const routes:Routes = [
    {path:'testscripts', component: MyTestScriptsComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TestscriptsRoutingModule
{

}