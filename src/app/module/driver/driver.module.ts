import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllListComponent } from './all-list/all-list.component';
import { DriverRoutingModule } from './driver-routing-module';
import { localModule } from '../common/local.module';
import { DriverComponent } from'./driver.component';


@NgModule({
  declarations: [
    DriverComponent,
    AllListComponent
  ],
  imports: [
    CommonModule,
    DriverRoutingModule,
    localModule
  ]
})
export class DriverModule { }
