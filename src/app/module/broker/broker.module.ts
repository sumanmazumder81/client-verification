import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllListComponent } from './all-list/all-list.component';
import { BrokerRoutingModule } from './broker-routing-module';
import { localModule } from '../common/local.module';
import { BrokerComponent } from'./broker.component';
@NgModule({
  declarations: [
    AllListComponent,
    BrokerComponent
  ],
  imports: [
    CommonModule,
    BrokerRoutingModule,
    localModule
  ]
})
export class BrokerModule { }
