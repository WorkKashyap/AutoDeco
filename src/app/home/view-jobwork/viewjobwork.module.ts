import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewJobworkRoutingModule } from './viewjobwork-routing.module';
import { ViewJobworkComponent } from './view-jobwork.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TableModule } from 'primeng/table';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [ViewJobworkComponent],
  imports: [
    CommonModule,
    ViewJobworkRoutingModule,
    NgxSpinnerModule,
    TableModule,
    NgxLoadingModule.forRoot({}),

  ]
})
export class ViewjobworkModule { 
  constructor()
  {
    console.log("View job work module called");
  }
}
