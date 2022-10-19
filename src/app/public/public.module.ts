import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { MyHeaderComponent } from './components/my-header/my-header.component';


@NgModule({
  declarations: [MyHeaderComponent],
  imports: [
    CommonModule,
    PublicRoutingModule
  ],
  exports: [ MyHeaderComponent]
})
export class PublicModule { }
