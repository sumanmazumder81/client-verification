import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesComponent } from './vehicles.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';

import { localModule } from '../common/local.module';

import { AllListComponent } from './all-list/all-list.component';

@NgModule({
  declarations: [
    AllListComponent,
    VehiclesComponent,
  ],
  imports: [
    CommonModule,
    localModule,
    VehiclesRoutingModule
  ],

})
export class VehiclesModule { }
