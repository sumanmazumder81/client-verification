import { NgModule, Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule, DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';
import { AllListComponent } from './all-list/all-list.component';

import { DetailsComponent } from '../common/component/details/details.component';
import { ImageViewComponent } from '../common/component/image-view/image-view.component';
const routes: Routes = [

  {path: '', redirectTo:"all-list", pathMatch: 'full'},
  {path: 'all-list', component: AllListComponent},

  {path: 'all-details', component: DetailsComponent,},
  {path: 'all-details/:id', component:DetailsComponent},
  {path: 'image-details', component: ImageViewComponent},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class VehiclesRoutingModule { }
