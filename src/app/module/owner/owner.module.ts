import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllListComponent } from './all-list/all-list.component';
import { OwnerRoutingModule } from './owner-routing-module';
import { localModule } from '../common/local.module';
import { OwnerComponent } from'./owner.component';
@NgModule({
  declarations: [
    OwnerComponent,
    AllListComponent
  ],
  imports: [
    CommonModule,
    localModule,
    OwnerRoutingModule
  ]
})
export class OwnerModule { }
