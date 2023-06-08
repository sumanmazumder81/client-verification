import { NgModule, Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule, DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';

import { BrokerComponent } from './broker.component';
import { DetailsComponent } from '../common/component/details/details.component';
import { ImageViewComponent } from '../common/component/image-view/image-view.component';

import { AllListComponent } from './all-list/all-list.component';


const routes: Routes = [

    {path: '', redirectTo:"all-list", pathMatch: 'full'},
    {path: 'all-list', component: AllListComponent},
    // {path: 'approve-list', component: ApproveListComponent},
    // {path: 'pending-list', component: PendingListComponent},
    // {path: 'decline-list', component: DeclineListComponent},

    {path: 'all-details', component: DetailsComponent,},
    {path: 'all-details/:id', component:DetailsComponent},
    {path: 'image-details', component: ImageViewComponent},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  // declarations: [VehicleListComponent, OwnerListComponent, BrokerListComponent, DriverListComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class BrokerRoutingModule { }
