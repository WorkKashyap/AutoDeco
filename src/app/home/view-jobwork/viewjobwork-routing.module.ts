import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewJobworkComponent } from "./view-jobwork.component";



const routes: Routes = [
    { path: "", component: ViewJobworkComponent},

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class ViewJobworkRoutingModule { }